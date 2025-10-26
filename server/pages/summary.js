const puppeteer = require('puppeteer');
const path = require('path');          // <-- add this
const dotenv = require('dotenv');
const mysql = require('mysql');
const fs = require("fs").promises;
const handlebars = require("handlebars");
const { Readable } = require("stream");
const os = require("os");

dotenv.config({ path: '../.env' });

const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db,
});

// Promise-based db query wrapper
function dbQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

exports.welcome = async (req, res) => {
    console.log("summary func : ",req.body);
    if (req.session.authorized == true)
    {
        //res.json({"authorized" : "true" })
        const query = `
        SELECT date, ttrs, tfp, foprolos, droit, tva, dtf, tcl, ttdec FROM summary
        WHERE client_id = ? `;
        db.query(query, req.session.user, (err, results) => {
            if (err) {
              console.error("DB error:", err);
              return res.status(500).json({ message: "Database error", authorized : "true" });
            }
            console.log("query summary results : ", results);
            return res.json({ summary: results, authorized : "true" });
          });
    }
    else
    {
        res.json({"authorized" : "false" })
    }
};

exports.print_doc = async (req, res) => {
  if (req.session.authorized !== true) {
    return res.json({ authorized: "false" });
  }
  const users = await dbQuery('SELECT * FROM accounts WHERE id = ?', [req.session.user]);
  if (users.length === 0) {
    return res.status(404).json({ message: 'User not found', saved: false });
  }
  const decl_date = req.body[0];
  console.log("decl_date :", decl_date);
  console.log("user data:", users);
  let html_data = users [0];
  html_data.decl_date = decl_date;
  html_data.month1= decl_date.split('-')[1][1];
  html_data.month0= decl_date.split('-')[1][0];
  html_data.year3= decl_date.split('-')[0][3];
  html_data.year2= decl_date.split('-')[0][2];
  html_data.year1= decl_date.split('-')[0][1];
  html_data.year0= decl_date.split('-')[0][0];
  let browser;
  try {

    // Load and compile Handlebars template
    const templatePath = path.join(__dirname, "../print_js/Formulaire Declaration TVA.hbs");
    const htmlTemplate = await fs.readFile(templatePath, "utf8");
    const template = handlebars.compile(htmlTemplate);
    const finalHtml = template(html_data);

    // Save the rendered HTML to a temp file so Puppeteer can resolve relative paths
    const tempHtmlPath = path.join(__dirname, "../print_js/_temp_render.html");
    await fs.writeFile(tempHtmlPath, finalHtml, "utf8");

    console.log("✅ HTML rendered to:", tempHtmlPath);

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Load HTML file from disk — relative CSS and images now work!
    const fileUrl = "file://" + tempHtmlPath;
    await page.goto(fileUrl, { waitUntil: "networkidle0" });

    // Generate PDF as a stream
    const pdfStream = await page.createPDFStream({
      printBackground: true,
      // format: "A4", // uncomment if you want to enforce A4
    });

    // Convert WHATWG stream → Node.js stream
    const nodeStream = Readable.fromWeb(pdfStream);

    // Send PDF as response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="mypage.pdf"',
    });

    nodeStream.pipe(res);

    // Cleanup
    nodeStream.on("end", async () => {
      await browser.close();
      console.log("✅ PDF stream completed and browser closed.");
    });

    nodeStream.on("error", async (err) => {
      console.error("❌ PDF stream error:", err);
      await browser.close();
      if (!res.headersSent) res.status(500).send("Failed to stream PDF");
    });
  } catch (err) {
    console.error("❌ print_doc error:", err);
    if (browser) {
      try {
        await browser.close();
      } catch (e) {}
    }
    res.status(500).send("Failed to generate PDF: " + (err?.message || err));
  }
};

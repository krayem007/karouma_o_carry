import icon from "../images/icon.png";
import React, { useState, useEffect } from "react";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import axios from  "axios";


    const handleDownload = () => {
      fetch('/api/pdf/download-pdf')
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'mypage.pdf');
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
        return <> <div> riuheroiuhrfeuihi </div><button> onClick={handleDownload}>Download PDF</button></>;
    };
  
    
  
  export default DownloadPDF;
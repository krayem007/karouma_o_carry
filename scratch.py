with open('client/src/css/style.css', 'r') as f:
    content = f.read()

marker = "/* ==========================================================================\n   MODERN GLASSMORPHISM THEME"
if marker in content:
    content = content[:content.find(marker)]
    with open('client/src/css/style.css', 'w') as f:
        f.write(content)
    print("Reverted CSS.")
else:
    print("Marker not found.")

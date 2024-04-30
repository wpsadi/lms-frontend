export function createHTMLBlob(body, style="") {
  // Step 1: Create HTML page content as a string
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Embedded HTML Page</title>
  <style>
  ${style}
  </style>
</head>
<body>
  ${body}
</body>
</html>
`;

  // Step 2: Convert HTML content to a Blob object
  const blob = new Blob([htmlContent], { type: "text/html" });

  // Step 3: Create URL for the Blob object
  const url = URL.createObjectURL(blob);

  return url;
}


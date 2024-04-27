import DOMPurify from 'dompurify';


export const purifyIt = ({htmlContent})=>{
    const sanitizedHtml = DOMPurify.sanitize(htmlContent);

    return sanitizedHtml

}
import markdown
from xhtml2pdf import pisa
from io import BytesIO

def markdown_to_pdf(markdown_text: str, profile: dict) -> BytesIO:
    """
    Converts Markdown resume text into a professional PDF using HTML/CSS.
    """
    
    # 1. Convert Markdown to HTML
    html_content = markdown.markdown(markdown_text)

    # 2. Define Professional CSS Styles
    css = """
    <style>
        @page {
            size: letter;
            margin: 2cm;
        }
        body {
            font-family: Helvetica, sans-serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            font-size: 24pt;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 10px;
        }
        .header-info {
            font-size: 10pt;
            color: #666;
            margin-bottom: 20px;
        }
        h2 {
            color: #2980b9;
            font-size: 14pt;
            margin-top: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            text-transform: uppercase;
        }
        h3 {
            font-size: 12pt;
            font-weight: bold;
            margin-top: 10px;
            margin-bottom: 2px;
        }
        p {
            margin-bottom: 8px;
            text-align: justify;
        }
        ul {
            margin-top: 0;
            padding-left: 20px;
        }
        li {
            margin-bottom: 4px;
        }
        strong {
            color: #2c3e50;
        }
    </style>
    """

    # 3. Construct Full HTML Document
    full_html = f"""
    <html>
    <head>{css}</head>
    <body>
        <div class="header">
            <h1>{profile.get('first_name', '')} {profile.get('last_name', '')}</h1>
            <div class="header-info">
                {profile.get('email', '')} | {profile.get('phone', '')}
            </div>
        </div>
        
        <div class="content">
            {html_content}
        </div>
    </body>
    </html>
    """

    # 4. Generate PDF
    pdf_buffer = BytesIO()
    pisa_status = pisa.CreatePDF(
        src=full_html,
        dest=pdf_buffer
    )

    if pisa_status.err:
        raise Exception("PDF generation failed")

    pdf_buffer.seek(0)
    return pdf_buffer
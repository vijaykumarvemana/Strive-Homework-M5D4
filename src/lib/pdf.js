
import PdfPrinter from 'pdfmake';

export const getPDFReadableStream = () => {
    const fonts = {
        Roboto: {
            normal : "Helvetica",
            bold : "Helvetica-Blod",
        },
    }

    const printer = PdfPrinter(fonts)
    const docDefinition = {
        content : [
            "hello everyone", "how is going with streams........."
        ]
    }
    const  pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
    pdfReadableStream.end()

    return pdfReadableStream
}



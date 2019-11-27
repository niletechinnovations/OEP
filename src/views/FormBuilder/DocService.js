import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, fileName = 'template') => {
    savePDF(html, { 
      paperSize: 'Letter',
      fileName: fileName+'.pdf',
      margin: 3
    })
  }
}

const Doc = new DocService();
export default Doc;
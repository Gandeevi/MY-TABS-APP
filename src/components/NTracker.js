// Negative Loop Clarifier / Tracker React App with Multi-language + Translate Popup
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Collapse } from 'react-bootstrap';
import { Plus, Minus, Trash2, Edit, RefreshCw } from 'react-feather';
import defaultLoops from './negative_loop_all_15.json';

const translations = {

   ar: {
    loopName: "اسم الحلقة",
    behavior: "ما أفعله (السلوك)",
    innerVoice: "الصوت في رأسي",
    cost: "ما يكلفني إياه",
    origin: "من أين يأتي",
    desire: "ما أريده بدلاً من ذلك",
    mantra: "تعويذة أو ممارسة جديدة",
    addLoop: "إضافة حلقة جديدة",
    title: "موضح/متعقب الحلقات السلبية",
    translate: "ترجمة"
  },
  de: {
    loopName: "Schleifenname",
    behavior: "Was ich tue (Verhalten)",
    innerVoice: "Die Stimme in meinem Kopf",
    cost: "Was es mich kostet",
    origin: "Woher es kommt",
    desire: "Was ich stattdessen will",
    mantra: "Neues Mantra oder Praxis",
    addLoop: "Neue Schleife hinzufügen",
    title: "Negativschleifen-Klärer / Tracker",
    translate: "Übersetzen"
  },

kn: { // Kannada
    loopName: "ಚಕ್ರದ ಹೆಸರು",
    behavior: "ನಾನು ಮಾಡುವುದು (ನೆಲೆಯು)",
    innerVoice: "ನನ್ನ ತಲೆಯಲ್ಲಿರುವ ಧ್ವನಿ",
    cost: "ಇದು ನನಗೆ ಏನು ಬೆಲೆ ನೀಡುತ್ತದೆ",
    origin: "ಇದು ಎಲ್ಲಿಂದ ಬರುತ್ತದೆ",
    desire: "ನಾನು ಬಯಸುವುದು ಬದಲಾಗಿ ಏನು",
    mantra: "ಹೆಸರು ಅಥವಾ ಹೊಸ ಅಭ್ಯಾಸ",
    addLoop: "ಹೊಸ ಚಕ್ರವನ್ನು ಸೇರಿಸಿ",
    title: "ಋಣಾತ್ಮಕ ಚಕ್ರ ಸ್ಪಷ್ಟೀಕರಣ / ಟ್ರ್ಯಾಕರ್",
    translate: "ಭಾಷಾಂತರಿಸಿ"
  },
  pt: { // Portuguese
    loopName: "Nome do ciclo",
    behavior: "O que eu faço (comportamento)",
    innerVoice: "A voz na minha cabeça",
    cost: "O que isso me custa",
    origin: "De onde vem",
    desire: "O que eu quero em vez disso",
    mantra: "Mantra ou nova prática",
    addLoop: "Adicionar novo ciclo",
    title: "Clarificador / Rastreador de Ciclos Negativos",
    translate: "Traduzir"
  },
  zh: { // Chinese (Simplified)
    loopName: "循环名称",
    behavior: "我做的事情（行为）",
    innerVoice: "我脑海中的声音",
    cost: "它对我造成的代价",
    origin: "它来自哪里",
    desire: "我想要的替代方案",
    mantra: "新的咒语或练习",
    addLoop: "添加新循环",
    title: "负面循环澄清器 / 跟踪器",
    translate: "翻译"
  } ,
  en: {
    loopName: "Loop Name",
    behavior: "What I Do (Behavior)",
    innerVoice: "The Voice in My Head",
    cost: "What It’s Costing Me",
    origin: "Where It Comes From",
    desire: "What I Want Instead",
    mantra: "New Mantra or Practice",
    addLoop: "Add New Loop",
    title: "Negative Loop Clarifier / Tracker",
    translate: "Translate"
  },
  te: {
    loopName: "లూప్ పేరు",
    behavior: "నేను చేసే పని (ప్రవర్తన)",
    innerVoice: "నా తలలో గొంతు",
    cost: "ఇది నాకు కలిగించే నష్టం",
    origin: "ఇది ఎక్కడి నుండి వచ్చిందో",
    desire: "దీని బదులుగా నేను ఏమి కోరుతున్నాను",
    mantra: "కొత్త మంత్రం లేదా అభ్యాసం",
    addLoop: "కొత్త లూప్ జోడించండి",
    title: "నెగటివ్ లూప్ క్లారిఫైయర్ / ట్రాకర్",
    translate: "అనువదించండి"
  },
  ta: {
    loopName: "லூப் பெயர்",
    behavior: "நான் செய்வது (நடத்தை)",
    innerVoice: "என் உள்ளக குரல்",
    cost: "இது எனக்கு ஏற்படுத்தும் செலவு",
    origin: "இது எங்கிருந்து வந்தது",
    desire: "நான் விரும்புவது",
    mantra: "புதிய மந்திரம் அல்லது பயிற்சி",
    addLoop: "புதிய லூப்பை சேர்க்கவும்",
    title: "எதிர்மறை சுழற்சி விளக்கி / கண்காணிப்பான்",
    translate: "மொழிபெயர்க்கவும்"
  },
  es: {
    loopName: "Nombre del ciclo",
    behavior: "Lo que hago (comportamiento)",
    innerVoice: "La voz en mi cabeza",
    cost: "Lo que me cuesta",
    origin: "De dónde viene",
    desire: "Lo que quiero en su lugar",
    mantra: "Nuevo mantra o práctica",
    addLoop: "Agregar nuevo ciclo",
    title: "Aclarador / Rastreador de Ciclos Negativos",
    translate: "Traducir"
  }
};

const defaultTemplate = {
  name: '',
  behavior: '',
  innerVoice: '',
  cost: '',
  origin: '',
  desire: '',
  mantra: ''
};

function translateMock(loop, lang) {
  if (lang === 'te') {
    return {
      name: "Fear of Shame",
      behavior: "Avoids risky situations",
      innerVoice: "You will never succeed",
      cost: "Missed opportunities",
      origin: "Childhood ridicule",
      desire: "Courage and expression",
      mantra: "I am safe to show up fully"
    };
  }
  return loop;
}

function App() {
  const [loops, setLoops] = useState(defaultLoops);
  const [showModal, setShowModal] = useState(false);
  const [currentLoop, setCurrentLoop] = useState(defaultTemplate);
  const [editIndex, setEditIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [lang, setLang] = useState('en');
  const [showTranslate, setShowTranslate] = useState(false);
  const [translatedLoop, setTranslatedLoop] = useState(defaultTemplate);

  const t = translations[lang];

  const openModal = (loop = defaultTemplate, index = null) => {
    setCurrentLoop(loop);
    setEditIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentLoop(defaultTemplate);
    setEditIndex(null);
    setShowModal(false);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...loops];
      updated[editIndex] = currentLoop;
      setLoops(updated);
    } else {
      setLoops([...loops, currentLoop]);
    }
    closeModal();
  };

  const handleDelete = (index) => {
    const updated = loops.filter((_, i) => i !== index);
    setLoops(updated);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(loops, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "negative_loops.json");
    dlAnchor.click();
  };

  const handleImport = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = e => {
      try {
        const importedLoops = JSON.parse(e.target.result);
        setLoops(importedLoops);
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    fileReader.readAsText(event.target.files[0]);
  };

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const showTranslation = (loop) => {
    const translated = translateMock(loop, lang);
    setTranslatedLoop(translated);
    setShowTranslate(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4>{t.title}</h4>
        <Form.Select value={lang} onChange={e => setLang(e.target.value)} style={{ width: '150px' }}>
          <option value="en">English</option>
          <option value="te">Telugu</option>
          <option value="ta">Tamil</option>
          <option value="es">Spanish</option>
           <option value="ar">Arabic</option>
           <option value="de">German</option>

<option value="pt">Portuguese</option>
<option value="zh">Chinese (Simplified)</option>
<option value="kn">Kannada</option>

        </Form.Select>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <Button variant="primary" onClick={() => openModal()}>{t.addLoop}</Button>
        <div>
          <input type="file" accept=".json" onChange={handleImport} />
          <Button variant="outline-secondary" className="ms-2" onClick={handleExport}>Export JSON</Button>
        </div>
      </div>

      {loops.length === 0 ? (
        <p className="text-muted text-center">No loops added yet.</p>
      ) : (
        <div className="list-group">
          {loops.map((loop, index) => (
            <div key={index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <span onClick={() => toggleCollapse(index)} role="button">
                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                  <strong>{loop.name}</strong>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-info" size="sm" onClick={() => showTranslation(loop)}><RefreshCw size={16} /></Button>
                  <Button variant="outline-secondary" size="sm" onClick={() => openModal(loop, index)}><Edit size={16} /></Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(index)}><Trash2 size={16} /></Button>
                </div>
              </div>
              <Collapse in={openIndex === index}>
                <div className="mt-3">
                  <p><strong>{t.behavior}:</strong> {loop.behavior}</p>
                  <p><strong>{t.innerVoice}:</strong> {loop.innerVoice}</p>
                  <p><strong>{t.cost}:</strong> {loop.cost}</p>
                  <p><strong>{t.origin}:</strong> {loop.origin}</p>
                  <p><strong>{t.desire}:</strong> {loop.desire}</p>
                  <p><strong>{t.mantra}:</strong> <em>{loop.mantra}</em></p>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      )}

      {/* Translate Popup */}
      <Modal show={showTranslate} onHide={() => setShowTranslate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t.translate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>{t.loopName}:</strong> {translatedLoop.name}</p>
          <p><strong>{t.behavior}:</strong> {translatedLoop.behavior}</p>
          <p><strong>{t.innerVoice}:</strong> {translatedLoop.innerVoice}</p>
          <p><strong>{t.cost}:</strong> {translatedLoop.cost}</p>
          <p><strong>{t.origin}:</strong> {translatedLoop.origin}</p>
          <p><strong>{t.desire}:</strong> {translatedLoop.desire}</p>
          <p><strong>{t.mantra}:</strong> <em>{translatedLoop.mantra}</em></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTranslate(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Loop' : t.addLoop}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t.loopName}</Form.Label>
              <Form.Control value={currentLoop.name} onChange={e => setCurrentLoop({ ...currentLoop, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t.behavior}</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.behavior} onChange={e => setCurrentLoop({ ...currentLoop, behavior: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t.innerVoice}</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.innerVoice} onChange={e => setCurrentLoop({ ...currentLoop, innerVoice: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t.cost}</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.cost} onChange={e => setCurrentLoop({ ...currentLoop, cost: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t.origin}</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.origin} onChange={e => setCurrentLoop({ ...currentLoop, origin: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t.desire}</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.desire} onChange={e => setCurrentLoop({ ...currentLoop, desire: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t.mantra}</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.mantra} onChange={e => setCurrentLoop({ ...currentLoop, mantra: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

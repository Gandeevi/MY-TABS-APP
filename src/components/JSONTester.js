import JsonImportExport from "./JsonImportExport";


<JsonImportExport
  onImport={(json) => setPalaces(json)}
  dataToExport={palaces}
  filename="memory-palaces.json"
/>



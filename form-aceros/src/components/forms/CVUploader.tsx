import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import './Form.css';
import axios from 'axios';

interface CVUploaderProps {
  userId: string;
  onError: (error: boolean) => void;
}

const CVUploader: React.FC<CVUploaderProps> = ({ userId, onError }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState(false);

 const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];

    // Establecer el nombre del archivo
    setFileName(file.name);
    setFileError(false);
    onError(false);

    // Enviar el archivo al backend
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId); // Enviar el ID del usuario

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Archivo subido:', response.data);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setFileError(true);
      onError(true);
    }
  } else {
    setFileName(null);
    setFileError(true);
    onError(true);
  }
};

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
      onError(false);
    } else {
      onError(true);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Box
      className={`cv-uploader ${fileError ? 'error' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Typography variant="h5" className="cv-title">
        Sube tu CV
      </Typography>
      <Typography variant="body2" className="cv-subtitle">
        Arrastra tu archivo aquí o haz clic para seleccionar
      </Typography>
      <Typography variant="body2" className="cv-note">
        Solo archivos PDF, DOC, DOCX, JPG máximo 10MB
      </Typography>
      <input
        id="cv"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg" // Restringe los tipos de archivos permitidos
      />
      <label htmlFor="cv">
        <Button variant="contained" component="span" className="cv-button">
          Seleccionar Archivo
        </Button>
      </label>
        <Typography variant="body2" className="cv-file-name">
          Archivo seleccionado: {fileName}
        </Typography>
    </Box>
  );
};

export default CVUploader;
import { useState } from 'react';
import { FormProducto } from './FormProducto';
// 1. IMPORTAMOS TU CONFIGURACIÓN DE FIREBASE Y LOS MÉTODOS DE FIRESTORE
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export const FormProductosContainer = () => {
  // Tus estados originales para los datos del producto
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    descripcion: '',
    imagen: ''
  });

  // Estados extra para manejar el archivo de imagen y el indicador de carga
  const [imagenFile, setImagenFile] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Manejador para los inputs de texto / numéricos / textarea
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: value
    });
  };

  // Manejador para cuando seleccionas un archivo de imagen en el input file
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagenFile(e.target.files[0]);
    }
  };

  // Lógica de envío que sube la imagen a ImgBB y luego procesa el producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validamos que se haya seleccionado una imagen si es obligatoria
    if (!imagenFile) {
      alert('Por favor, selecciona una imagen para el producto.');
      return;
    }

    setCargando(true);
    const apiKey = "05253b8db7a6d8eac8765def013a98b5"; // Tu API Key de ImgBB
    const formData = new FormData();
    formData.append("image", imagenFile);

    try {
      console.log("Subiendo imagen a Imgbb...");
      const respuestaImgbb = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const datosImgbb = await respuestaImgbb.json();

      if (datosImgbb.success) {
        const imageUrl = datosImgbb.data.url;
        console.log("Imagen subida con éxito. URL:", imageUrl);

        // 2. ARMAMOS EL OBJETO CONVIRTIENDO LOS CAMPOS NUMÉRICOS
        const productoFinal = {
          nombre: nuevoProducto.nombre,
          precio: Number(nuevoProducto.precio),
          stock: Number(nuevoProducto.stock),
          categoria: nuevoProducto.categoria,
          descripcion: nuevoProducto.descripcion,
          imagen: imageUrl, // Guardamos la URL directa de ImgBB
          fechaRegistro: new Date() // Útil para ordenar los productos más nuevos primero
        };

        console.log("Guardando producto en Firebase Firestore...");
        
        // 3. ENVIAMOS EL OBJETO A LA COLECCIÓN "productos" DE TU FIREBASE
        const docRef = await addDoc(collection(db, 'productos'), productoFinal);

        console.log("Guardado exitoso con ID de Firebase:", docRef.id);
        alert(`¡Producto "${productoFinal.nombre}" guardado con éxito en Firebase!`);

        // Limpiamos el formulario después de enviar
        setNuevoProducto({
          nombre: '',
          precio: '',
          stock: '',
          categoria: '',
          descripcion: '',
          imagen: ''
        });
        setImagenFile(null);
        
        // Resetea visualmente el input de tipo archivo en el formulario
        e.target.reset();

      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }

    } catch (error) {
      console.error("Error en el proceso:", error);
      alert("Hubo un error al subir la imagen o registrar el producto en la base de datos.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <FormProducto
      nuevoProducto={nuevoProducto}
      handleInputChange={handleInputChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      cargando={cargando}
      imagenFile={imagenFile}
    />
  );
};

export default FormProductosContainer;

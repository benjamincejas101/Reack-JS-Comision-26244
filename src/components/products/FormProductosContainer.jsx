import { useState, useEffect } from 'react'; // 👈 Agregamos useEffect
import { FormProducto } from './FormProducto';
import { db, storage } from '../../firebase/config'; 
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const FormProductosContainer = () => {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    descripcion: '',
    imagen: ''
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [cargando, setCargando] = useState(false);

  // 1. EJECUCIÓN AUTOMÁTICA AL CARGAR LA PÁGINA
  useEffect(() => {
    const ejecutarInyeccionAutomatica = async () => {
      const productosAInyectar = [
        {
          "nombre": "Teclado Mecánico Gamer RGB",
          "precio": 45999,
          "stock": 12,
          "categoria": "Periféricos",
          "descripcion": "Teclado mecánico 60% con switches Red, iluminación RGB personalizable y cable USB tipo C desmontable.",
          "imagen": "/images/StockCake-Tecladogamer_llante-_1730765942_medium.jpg"
        },
        {
          "nombre": "Mouse Inalámbrico Ergonómico",
          "precio": 18500,
          "stock": 25,
          "categoria": "Periféricos",
          "descripcion": "Sensor óptico de alta precisión con hasta 4000 DPI, diseño ergonómico y batería recargable de larga duración.",
          "imagen": "/images/mouse inalámbrico.webp"
        },
        {
          "nombre": "Auriculares Gamer 7.1 Surround",
          "precio": 32400,
          "stock": 8,
          "categoria": "Audio",
          "descripcion": "Sonido envolvente 7.1, micrófono con cancelación de ruido y almohadillas de memoria de alta comodidad.",
          "imagen": "/images/StockCake-Auriculares_gaming_de_neón--5003504-medium.jpg"
        },
        {
          "nombre": "Monitor 24\" IPS 144Hz",
          "precio": 215000,
          "stock": 5,
          "categoria": "Monitores",
          "descripcion": "Panel IPS con resolución Full HD, tiempo de respuesta de 1ms y tecnología FreeSync para gaming fluido.",
          "imagen": "/images/monitor.jpg"
        },
        {
          "nombre": "Placa de Video NVIDIA RTX 3060",
          "precio": 450000,
          "stock": 3,
          "categoria": "Hardware",
          "descripcion": "12GB GDDR6, arquitectura Ampere, ideal para gaming en 1080p y renderizado 3D avanzado.",
          "imagen": "/images/placa-de-video-geforce-rtx-3060-12gb-msi-ventus-2x-oc-0.jpg"
        },
        {
          "nombre": "Disco SSD M.2 NVMe 1TB",
          "precio": 78900,
          "stock": 15,
          "categoria": "Almacenamiento",
          "descripcion": "Velocidades de lectura de hasta 3500 MB/s, ideal para reducir tiempos de carga en sistema operativo y juegos.",
          "imagen": "/images/StockCake-Tecnología_de_Almacenamiento_Elegante-3688130-medium.jpg"
        },
        {
          "nombre": "Procesador AMD Ryzen 5 5600X",
          "precio": 240000,
          "stock": 7,
          "categoria": "Hardware",
          "descripcion": "6 núcleos, 12 hilos, velocidad boost de hasta 4.6 GHz con cooler Wraith Stealth incluido.",
          "imagen": "/images/deeteronitop-l74RSvnLTdQ-unsplash.jpg"
        },
        {
          "nombre": "Memoria RAM 16GB (2x8GB) DDR4 3200MHz",
          "precio": 65000,
          "stock": 20,
          "categoria": "Hardware",
          "descripcion": "Kit de memoria dual channel con disipador de aluminio y perfil XMP 2.0 para fácil overclock.",
          "imagen": "/images/StockCake-Laberinto_de_Circuitos_de_Silicio-2085577-medium.jpg"
        },
        {
          "nombre": "Gabinete Gamer Vidrio Templado",
          "precio": 72000,
          "stock": 10,
          "categoria": "Gabinetes",
          "descripcion": "Media torre con panel lateral de vidrio templado, 3 fans RGB preinstalados y excelente flujo de aire.",
          "imagen": "/images/andrey-matveev-E2aPGg02QdI-unsplash.jpg"
        },
        {
          "nombre": "Fuente de Poder 600W 80 Plus Bronze",
          "precio": 85000,
          "stock": 12,
          "categoria": "Hardware",
          "descripcion": "Certificación 80 Plus Bronze, diseño de cables mallados y protección inteligente contra sobretensiones.",
          "imagen": "/images/StockCake-Potencia_de_juego_iluminada--2594359-medium.jpg"
        },
        {
          "nombre": "Silla Gamer Ergonómica Reclinable",
          "precio": 290000,
          "stock": 4,
          "categoria": "Mobiliario",
          "descripcion": "Altura ajustable, respaldo reclinable hasta 150 grados, almohadones lumbar y cervical incluidos.",
          "imagen": "/images/silla gamer.webp"
        },
        {
          "nombre": "Micrófono Condensador USB Streaming",
          "precio": 54000,
          "stock": 9,
          "categoria": "Audio",
          "descripcion": "Patrón polar cardioide, control de volumen integrado, salida de auriculares y soporte de escritorio.",
          "imagen": "/images/692586-MLA32170094093_092019-F.jpg"
        },
        {
          "nombre": "Webcam Full HD 1080p con Micrófono",
          "precio": 38000,
          "stock": 14,
          "categoria": "Periféricos",
          "descripcion": "Ideal para videollamadas y streaming, enfoque automático y corrección de luz avanzada.",
          "imagen": "/images/StockCake-La_tecnología_encuentra_la_madera-2287043-medium.jpg"
        },
        {
          "nombre": "Joystick Inalámbrico Compatible PC/Console",
          "precio": 49999,
          "stock": 18,
          "categoria": "Periféricos",
          "descripcion": "Diseño ergonómico, gatillos analógicos sensibles a la presión y batería de larga duración con receptor USB.",
          "imagen": "/images/joystick.jpg"
        },
        {
          "nombre": "Notebook Gamer 15.6\" i5 RTX 4050",
          "precio": 1250000,
          "stock": 2,
          "categoria": "Equipos",
          "descripcion": "Pantalla 144Hz, procesador Intel Core i5 de última generación, 16GB RAM y almacenamiento SSD de 512GB.",
          "imagen": "/images/StockCake-GPU_gaming_de_neón--4395961-medium.jpg"
        },
        {
          "nombre": "Refrigeración Líquida ARGB 240mm",
          "precio": 115000,
          "stock": 6,
          "categoria": "Hardware",
          "descripcion": "Sistema de enfriamiento líquido con radiador de 240mm, dos ventiladores ARGB de alta presión estática y bomba silenciosa.",
          "imagen": "/images/cooler-liquido.jpg"
        }
      ];

      console.log("🚀 EJECUTANDO INYECCIÓN CRÍTICA DE CATÁLOGO...");
      const productosRef = collection(db, "productos");

      try {
        for (const prod of productosAInyectar) {
          await addDoc(productosRef, {
            ...prod,
            fechaRegistro: new Date()
          });
          console.log(`✅ Inyectado en Firebase: ${prod.nombre}`);
        }
        alert("🎉 ¡ÉXITO! Los 16 productos se inyectaron automáticamente en Firebase Firestore.");
      } catch (error) {
        console.error("❌ Error en la carga masiva:", error);
      }
    };

    ejecutarInyeccionAutomatica();
  }, []); // Se ejecuta una única vez en cuanto se abre este contenedor

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagenFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagenFile) { alert('Selecciona una imagen.'); return; }
    setCargando(true);
    try {
      const storageRef = ref(storage, `productos/${Date.now()}_${imagenFile.name}`);
      await uploadBytes(storageRef, imagenFile);
      const imageUrl = await getDownloadURL(storageRef);
      const productoFinal = {
        ...nuevoProducto,
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock),
        imagen: imageUrl,
        fechaRegistro: new Date()
      };
      await addDoc(collection(db, 'productos'), productoFinal);
      alert(`¡"${productoFinal.nombre}" guardado!`);
      setNuevoProducto({ nombre: '', precio: '', stock: '', categoria: '', descripcion: '', imagen: '' });
      setImagenFile(null);
      e.target.reset();
    } catch (error) {
      console.error(error);
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

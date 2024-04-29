import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';



// peticion al servidor : modificar la url segun su ip local 192.186.X.X
const urlResource = 'http://192.168.100.2:3001/api/pedido';

const crearPedido = async (pedidoData) => {
  try {
    console.log(pedidoData);
    const response = await axios.post(urlResource, pedidoData);
    console.log('Pedido creado con éxito');
    return response.data;
  } catch (error) {
    console.log('Error al crear pedido:', error);
    throw error;
  }
};


const CrearPedidoView = () => {
  const [TipoCarga, setTipoCarga] = useState("");

  const [isDateTimePickerVisibleRetiro, setIsDateTimePickerVisibleRetiro] = useState(false);
  const [isDateTimePickerVisibleEntrega, setIsDateTimePickerVisibleEntrega] = useState(false);
  const [selectedDateRetiro, setSelectedDateRetiro] = useState(null);
  const [selectedDateEntrega, setSelectedDateEntrega] = useState(null);

  const [CalleRetiro, setCalleRetiro] = useState("");
  const [AlturaRetiro, setNumeroRetiro] = useState("");
  const [LocalidadRetiro, setLocalidadRetiro] = useState("");
  const [ProvinciaRetiro, setProvinciaRetiro] = useState("");
  const [ReferenciaRetiro, setReferenciaRetiro] = useState("");

  const [CalleEntrega, setCalleEntrega] = useState("");
  const [AlturaEntrega, setNumeroEntrega] = useState("");
  const [LocalidadEntrega, setLocalidadEntrega] = useState("");
  const [ProvinciaEntrega, setProvinciaEntrega] = useState("");
  const [ReferenciaEntrega, setReferenciaEntrega] = useState("");

  const [foto, setFoto] = useState(null);

  const handleSeleccionarFoto = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Se necesita permiso para acceder a la galería de fotos");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFoto(result.uri);
    }
  };

  const handleSubmit = () => {
    if (
      TipoCarga &&
      selectedDateRetiro &&
      CalleRetiro &&
      AlturaRetiro &&
      LocalidadRetiro &&
      ProvinciaRetiro &&
      CalleEntrega &&
      selectedDateEntrega &&
      AlturaEntrega &&
      LocalidadEntrega &&
      ProvinciaEntrega
    ) {

      if (selectedDateRetiro>selectedDateEntrega) {
        alert("La fecha de retiro no puede ser superior a la fecha de entrega");
      }
      
      // si pasa las restricciones del front, se crea el pedido

      const pedidoEnvio = {
        TipoCarga,
        FechaRetiro: selectedDateRetiro.toISOString(),
        CalleRetiro,
        AlturaRetiro,
        LocalidadRetiro,
        ProvinciaRetiro,
        ReferenciaRetiro,
        FechaEntrega: selectedDateEntrega.toISOString(),
        CalleEntrega,
        AlturaEntrega,
        LocalidadEntrega,
        ProvinciaEntrega,
        ReferenciaEntrega,
        foto,
      };
    
      try {
        
        crearPedido(pedidoEnvio);
        alert("Pedido creado exitosamente");
        
        setTipoCarga("");
        //limpiar los otros tambien

      } catch (error) {
        console.error("Error al crear el pedido:", error);
        alert("Hubo un error al crear el pedido");
      }
    } else {
      alert("Faltan campos por rellenar");
    }
  };
  const handleDateChangeRetiro = (event, selectedDateRetiro) => {
    const currentDate = selectedDateRetiro || new Date();
    setSelectedDateRetiro(currentDate);
    setIsDateTimePickerVisibleRetiro(false);
  };

  const handleDateChangeEntrega = (event, selectedDateEntrega) => {
    const currentDate = selectedDateEntrega || new Date();
    setSelectedDateEntrega(currentDate);
    setIsDateTimePickerVisibleEntrega(false);
  };

  const showDateTimePickerRetiro = () => {
    const currentDate = selectedDateRetiro || new Date();
    setSelectedDateRetiro(currentDate);
    setIsDateTimePickerVisibleRetiro(true);
  };

  const showDateTimePickerEntrega = () => {
    const currentDate = selectedDateEntrega || new Date();
    setSelectedDateEntrega(currentDate);
    setIsDateTimePickerVisibleEntrega(true);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.paperBox}>
          <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: "bold" }}>
            Tipo de carga
          </Text>
          <RNPickerSelect
            placeholder={{ label: "Seleccionar tipo de carga", value: null }}
            value={TipoCarga}
            onValueChange={(value) => setTipoCarga(value)}
            items={[
              { label: "Documentación", value: "documentacion" },
              { label: "Paquete", value: "paquete" },
              { label: "Granos", value: "granos" },
              { label: "Hacienda", value: "hacienda" },
            ]}
          />
        </View>
        <View style={styles.paperBox}>
          <Text style={styles.sectionHeader}>Retiro</Text>

          <View style={styles.paperBox}>
            <Text style={styles.sectionHeader}>Fecha</Text>
            <TouchableOpacity onPress={showDateTimePickerRetiro}>
              <Text style={styles.dateTimePickerText}>
                {selectedDateRetiro ? selectedDateRetiro.toLocaleDateString("es-ES") : "Seleccionar fecha"}
              </Text>
            </TouchableOpacity>
            {isDateTimePickerVisibleRetiro && (
              <DateTimePicker
                value={selectedDateRetiro}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={handleDateChangeRetiro}
                style={styles.dateTimePicker}
              />
            )}
          </View>

          <View style={styles.paperBox}>
            <Text style={styles.sectionHeader}>Dirección</Text>
            <Text>Calle:</Text>
            <TextInput
              style={styles.input}
              value={CalleRetiro}
              onChangeText={setCalleRetiro}
              placeholder="Calle"
            />

            <Text>Número:</Text>
            <TextInput
              style={styles.input}
              value={AlturaRetiro}
              onChangeText={setNumeroRetiro}
              placeholder="Número"
              keyboardType="numeric"
            />

            <Text>Localidad:</Text>
            <TextInput
              style={styles.input}
              value={LocalidadRetiro}
              onChangeText={setLocalidadRetiro}
              placeholder="Localidad"
            />

            <Text>Provincia:</Text>
            <TextInput
              style={styles.input}
              value={ProvinciaRetiro}
              onChangeText={setProvinciaRetiro}
              placeholder="Provincia"
            />

            <Text>Referencia:</Text>
            <TextInput
              style={styles.input}
              value={ReferenciaRetiro}
              onChangeText={setReferenciaRetiro}
              placeholder="Referencia (opcional)"
            />
          </View>

        </View>

        <View style={styles.paperBox}>
          <Text style={styles.sectionHeader}>Entrega</Text>

          <View style={styles.paperBox}>
            <Text style={styles.sectionHeader}>Fecha</Text>
            <TouchableOpacity onPress={showDateTimePickerEntrega}>
              <Text style={styles.dateTimePickerText}>
                {selectedDateEntrega ? selectedDateEntrega.toLocaleDateString("es-ES") : "Seleccionar fecha"}
              </Text>
            </TouchableOpacity>
            {isDateTimePickerVisibleEntrega && (
              <DateTimePicker
                value={selectedDateEntrega}
                mode="date"
                display="default"
                minimumDate={selectedDateRetiro ? selectedDateRetiro : new Date()}
                onChange={handleDateChangeEntrega}
                style={styles.dateTimePicker}
              />
            )}
          </View>

        <View style={styles.paperBox}>
          <Text style={styles.sectionHeader}>Dirección</Text>
          <Text>Calle:</Text>
          <TextInput
            style={styles.input}
            value={CalleEntrega}
            onChangeText={setCalleEntrega}
            placeholder="Calle"
          />

          <Text>Número:</Text>
          <TextInput
            style={styles.input}
            value={AlturaEntrega}
            onChangeText={setNumeroEntrega}
            placeholder="Número"
            keyboardType="numeric"
          />

          <Text>Localidad:</Text>
          <TextInput
            style={styles.input}
            value={LocalidadEntrega}
            onChangeText={setLocalidadEntrega}
            placeholder="Localidad"
          />

          <Text>Provincia:</Text>
          <TextInput
            style={styles.input}
            value={ProvinciaEntrega}
            onChangeText={setProvinciaEntrega}
            placeholder="Provincia"
          />

          <Text>Referencia:</Text>
          <TextInput
            style={styles.input}
            value={ReferenciaEntrega}
            onChangeText={setReferenciaEntrega}
            placeholder="Referencia (opcional)"
          />
        </View>
        </View>

        <TouchableOpacity onPress={handleSeleccionarFoto} style={styles.button}>
          <Text>Seleccionar Foto (opcional)</Text>
        </TouchableOpacity>

        {foto && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: foto }} style={styles.image} />
          </View>
        )}

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text>Crear Pedido de Envío</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24
  },
  paperBox: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#999",
    borderWidth: 0.5,
    backgroundColor: "#FFF",
    elevation: 4,
    padding: 20,
    margin: 12,
    marginBottom: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 24
  },
  dateTimePicker: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default CrearPedidoView;


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

const CrearPedidoView = () => {
  const [tipoCarga, setTipoCarga] = useState("");

  const [isDateTimePickerVisibleRetiro, setIsDateTimePickerVisibleRetiro] = useState(false);
  const [isDateTimePickerVisibleEntrega, setIsDateTimePickerVisibleEntrega] = useState(false);
  const [selectedDateRetiro, setSelectedDateRetiro] = useState(null);
  const [selectedDateEntrega, setSelectedDateEntrega] = useState(null);

  const [calleRetiro, setCalleRetiro] = useState("");
  const [numeroRetiro, setNumeroRetiro] = useState("");
  const [localidadRetiro, setLocalidadRetiro] = useState("");
  const [provinciaRetiro, setProvinciaRetiro] = useState("");
  const [referenciaRetiro, setReferenciaRetiro] = useState("");

  const [calleEntrega, setCalleEntrega] = useState("");
  const [numeroEntrega, setNumeroEntrega] = useState("");
  const [localidadEntrega, setLocalidadEntrega] = useState("");
  const [provinciaEntrega, setProvinciaEntrega] = useState("");
  const [referenciaEntrega, setReferenciaEntrega] = useState("");

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
      tipoCarga &&
      selectedDateRetiro &&
      calleRetiro &&
      numeroRetiro &&
      localidadRetiro &&
      provinciaRetiro &&
      calleEntrega &&
      selectedDateEntrega &&
      numeroEntrega &&
      localidadEntrega &&
      provinciaEntrega
    ) {

      if (selectedDateRetiro>selectedDateEntrega) {
        alert("Fechas incorrectas");
      }

      console.log("Tipo de carga:", tipoCarga);
      console.log("Calle:", calleRetiro);
      console.log("Número:", numeroRetiro);
      console.log("Localidad:", localidadRetiro);
      console.log("Provincia:", provinciaRetiro);
      console.log("Referencia:", referenciaRetiro);

      console.log("Calle:", calleEntrega);
      console.log("Número:", numeroEntrega);
      console.log("Localidad:", localidadEntrega);
      console.log("Provincia:", provinciaEntrega);
      console.log("Referencia:", referenciaEntrega);
      console.log("Foto:", foto);
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
            value={tipoCarga}
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
              value={calleRetiro}
              onChangeText={setCalleRetiro}
              placeholder="Calle"
            />

            <Text>Número:</Text>
            <TextInput
              style={styles.input}
              value={numeroRetiro}
              onChangeText={setNumeroRetiro}
              placeholder="Número"
              keyboardType="numeric"
            />

            <Text>Localidad:</Text>
            <TextInput
              style={styles.input}
              value={localidadRetiro}
              onChangeText={setLocalidadRetiro}
              placeholder="Localidad"
            />

            <Text>Provincia:</Text>
            <TextInput
              style={styles.input}
              value={provinciaRetiro}
              onChangeText={setProvinciaRetiro}
              placeholder="Provincia"
            />

            <Text>Referencia:</Text>
            <TextInput
              style={styles.input}
              value={referenciaRetiro}
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
            value={calleEntrega}
            onChangeText={setCalleEntrega}
            placeholder="Calle"
          />

          <Text>Número:</Text>
          <TextInput
            style={styles.input}
            value={numeroEntrega}
            onChangeText={setNumeroEntrega}
            placeholder="Número"
            keyboardType="numeric"
          />

          <Text>Localidad:</Text>
          <TextInput
            style={styles.input}
            value={localidadEntrega}
            onChangeText={setLocalidadEntrega}
            placeholder="Localidad"
          />

          <Text>Provincia:</Text>
          <TextInput
            style={styles.input}
            value={provinciaEntrega}
            onChangeText={setProvinciaEntrega}
            placeholder="Provincia"
          />

          <Text>Referencia:</Text>
          <TextInput
            style={styles.input}
            value={referenciaEntrega}
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


import React, { useState, useRef } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

const MyModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const generateQRCode = () => {
    // Acción a realizar al generar el código QR
  };

  // Exportamos la función openModal usando useRef
  // Esto nos permite acceder a la función desde fuera del componente
  modalRef.current = {
    openModal: () => openModal(),
  };

  return (
    <View>
      <Pressable onPress={openModal}>
        <Text>Abrir modal</Text>
      </Pressable>

      <Modal visible={modalVisible} onRequestClose={closeModal}>
        <View>
          <Text>Contenido del modal</Text>

          <Pressable onPress={generateQRCode}>
            <Text>Generar código QR</Text>
          </Pressable>

          <Pressable onPress={closeModal}>
            <Text>Cerrar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default MyModal;

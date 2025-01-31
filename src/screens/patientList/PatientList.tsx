import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, Pressable, ToastAndroid } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useAppNavigation } from '../../utils/AppNavigation';

const GET_PATIENTS = gql`
  query GetPatients($gender: Gender, $ageRange: String) {
    getPatientsByDoctor(gender: $gender, ageRange: $ageRange) {
      id
      name
      age
      photo
    }
  }
`;

interface Patient {
  id: string;
  name: string;
  age: number;
  photo: string | null;
}

interface GetPatientsByDoctorResponse {
  getPatientsByDoctor: Patient[];
}

const PatientList: React.FC = () => {
  const navigation = useAppNavigation();

  // States for modal visibility, filter options
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'MALE' | 'FEMALE' | 'OTHER' | null>(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null);

  // Fetch patients based on filters
  const { loading, error, data, refetch } = useQuery<GetPatientsByDoctorResponse>(GET_PATIENTS, {
    variables: {
      gender: selectedGender,
      ageRange: selectedAgeRange,
    },
  });

  const applyFilter = () => {
    setModalVisible(false);
    refetch({
      gender: selectedGender,
      ageRange: selectedAgeRange,
    });
  };

  // Show Android toast if there is an error
  if (error) {
    ToastAndroid.showWithGravity(
      `Error: ${error.message}`,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  }

  const patients = data?.getPatientsByDoctor.map((patient) => ({
    id: patient.id,
    name: patient.name,
    age: `${patient.age} years`,
    image: patient.photo ? { uri: patient.photo } : require('../../assets/images/google.png'),
  }));

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.appointmentItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{item.age}</Text>
        </View>
      </View>

      <TouchableOpacity>
        <Image source={require('../../assets/images/Dots.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Patient List</Text>

        {/* Union Button to Open Modal */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={require('../../assets/images/Union.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SearchAppointment")}>
          <Image source={require('../../assets/images/Search.png')} />
        </TouchableOpacity>
      </View>

      {/* Patient List */}
      <FlatList
        data={patients}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexShrink: 0, flexGrow: 0 }}
      />

      {/* Dimmed Background (Visible only when the modal is open) */}
      {modalVisible && <View style={styles.dimBackground} />}

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>

        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Image source={require('../../assets/images/Cross.png')} style={styles.closeIcon} />
              </TouchableOpacity>

          <Text style={styles.modalTitle}>Filter</Text>

          {/* Gender Filter */}
          <Text style={styles.filterLabel}>Gender</Text>
          <View style={styles.filterRow}>
            <Pressable
              style={[styles.filterButton, selectedGender === 'MALE' && styles.activeFilter]}
              onPress={() => setSelectedGender('MALE')}
            >
              <Text>Male</Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, selectedGender === 'FEMALE' && styles.activeFilter]}
              onPress={() => setSelectedGender('FEMALE')}
            >
              <Text>Female</Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, selectedGender === 'OTHER' && styles.activeFilter]}
              onPress={() => setSelectedGender('OTHER')}
            >
              <Text>Others</Text>
            </Pressable>
          </View>

          {/* Age Range Filter */}
          <Text style={styles.filterLabel}>Age Range</Text>
          <View style={styles.filterRow}>
            {['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', 'Above 70'].map(range => (
              <Pressable
                key={range}
                style={[styles.filterButton, selectedAgeRange === range && styles.activeFilter]}
                onPress={() => setSelectedAgeRange(range)}
              >
                <Text>{range}</Text>
              </Pressable>
            ))}
          </View>

          {/* Apply and Reset Buttons */}
          <View style={styles.modalActions}>
            <Pressable style={styles.resetButton} onPress={() => {
              setSelectedGender(null);
              setSelectedAgeRange(null);
              refetch({ gender: null, ageRange: null });
              setModalVisible(false);
            }}>
              <Text>Reset</Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={applyFilter}>
              <Text>Apply</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    backgroundColor: '#1EB6B9',
    color: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1EB6B9',
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 25,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444444',
  },
  info: {
    color: '#666',
    fontSize: 14,
    fontWeight: '400',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dimBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,  // Ensure modal is above the dimmed background
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },


  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    height: 33,
    width: 105,
  },
  activeFilter: {
    borderColor: '#1EB6B9',
    backgroundColor: '#E0F7FA',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  applyButton: {
    padding: 10,
    backgroundColor: '#1EB6B9',
    borderRadius: 10,
    color: 'white',
  },
});

export default PatientList;

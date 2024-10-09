import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';

// GraphQL query to fetch appointments based on the status
const GET_DOCTOR_APPOINTMENTS = gql`
  query GetDoctorAppointments($status: String!) {
    getPatientsByDoctor(status: $status)  {
      id
      name
      age
      photo
      appointments {
        id
        status
        appointmentTime
      }
    }
  }
`;
interface Appointment {  
  id: string;  
  status: string;  
  appointmentTime: string;  
}  

interface Patient {  
  id: string;  
  name: string;  
  age: number;  
  photo: string | null;  
  appointments: Appointment[];  
} 

interface GetPatientsByDoctorResponse {  
  getPatientsByDoctor: Patient[];  
} 
const AppointmentsScreen: React.FC = () => {
  const [filter, setFilter] = useState<'UPCOMING' | 'MISSED' | 'COMPLETED'>('UPCOMING');

  // Apollo Client query to fetch data based on the filter
  const { loading, error, data } = useQuery<GetPatientsByDoctorResponse>(GET_DOCTOR_APPOINTMENTS, {  
    variables: { status: filter },  
  });

  // Check if data is available
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching appointments: {error.message}</Text>;
  if (!data || !data.getPatientsByDoctor) return <Text>No appointments found.</Text>;

  // Transforming fetched data into the format needed for the FlatList
  const appointments = data.getPatientsByDoctor.flatMap((patient) =>
    patient.appointments.map((appointment) => ({
      id: `${patient.id}-${appointment.id}`, // Combine patient and appointment IDs to get unique ID for FlatList
      name: patient.name,
      age: `${patient.age} years`,
      time: appointment.appointmentTime,
      status: appointment.status,
      image: patient.photo ? { uri: patient.photo } : require('../../assets/images/google.png'), // Correct the image source format
    }))
  );

  const renderItem = ({ item }: { item: typeof appointments[0] }) => (
    <View style={styles.appointmentItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}>{item.age} | {item.time}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.more}>:</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointments</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter('UPCOMING')} style={[styles.filterButton, filter === 'UPCOMING' && styles.activeFilter]}>
          <Text style={styles.filterText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('MISSED')} style={[styles.filterButton, filter === 'MISSED' && styles.activeFilter]}>
          <Text style={styles.filterText}>Missed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('COMPLETED')} style={[styles.filterButton, filter === 'COMPLETED' && styles.activeFilter]}>
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.todayContainer}>
        <Text style={styles.todayText}>Today</Text>
      </View>

      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexShrink: 0,flexGrow:0 }}
      />
   <TouchableOpacity style={styles.viewPastButton}>
        <Text style={styles.viewPastText}>View past appointments {">"}</Text>
      </TouchableOpacity>
    

<View  style={styles.addButtonContainer}>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity></View>

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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  filterButton: {
    padding: 10,
  },
  activeFilter: {
    borderBottomWidth: 3,
    borderBottomColor: '#1EB6B9',
  },
  filterText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },
  todayContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    alignItems: 'center',
  },
  todayText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '400',
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
  more: {
    fontSize: 24,
    color: '#00BFFF',
  },

  addButtonContainer:{

    alignItems: "flex-end",
    padding:20,
  },

  addButton: {
    width: 54,
    height: 54,
    borderRadius: 30,
    backgroundColor: '#1EB6B9',
    justifyContent: 'center',
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  viewPastButton: {
    alignItems: 'center',
    padding: 10,
  },
  viewPastText: {
    color: '#1EB6B9',
    fontSize: 14,
    fontWeight: '400',
  },



 




});

export default AppointmentsScreen;

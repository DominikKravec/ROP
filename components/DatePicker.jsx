import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import CustomModal from './CustomModal.jsx'
import DateModal from './DateModal.jsx'
import MonthModal from './MonthModal.jsx'
import YearModal from './YearModal.jsx'

const DatePicker = ({date, month, year, setDate, setMonth, setYear}) => {

  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState()

  return (
    <View className={"flex flex-row justify-center"}>
        <TouchableOpacity
            onPress={() => {
                setModalContent((<DateModal date={date} setDate={setDate} setModal={setModal}/>))
                setModal(true)
            }}
        >
            <Text className="text-3xl text-blue">
                {date}
            </Text>
        </TouchableOpacity>
            <Text className="text-3xl text-blue">.</Text>
        <TouchableOpacity                                   
            onPress={() => {
                setModalContent((<MonthModal month={month} setMonth={setMonth} setModal={setModal}/>))
                setModal(true)
            }}
        >
            <Text className="text-3xl text-blue">
                {month}
            </Text>
        </TouchableOpacity>
        <Text className="text-3xl text-blue">.</Text>
        <TouchableOpacity
            onPress={() => {
                setModalContent((<YearModal year={year} setYear={setYear} setModal={setModal}/>))
                setModal(true)
            }}
        >
            <Text className="text-3xl text-blue">
                {year}
            </Text>
        </TouchableOpacity>
        <CustomModal
            modal={modal}
            setModal={setModal}
            modalContent={modalContent}
        />
        
    </View>
  )
}

export default DatePicker
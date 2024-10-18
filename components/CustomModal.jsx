import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'

const CustomModal = ({modalContent, modal, setModal}) => {
  return (
    <Modal
        animationType='slide'
        onRequestClose={()=>{setModal(false)}}
        visible={modal}
        transparent={true}
    >
        <View className='h-full justify-center items-center'>
        <View className='bg-primary border-blue border-4 rounded-xl p-5'>
            <View className=''>
            <TouchableOpacity
                onPress={() => {setModal(false)}}
            >
                <Image 
                source={icons.close}
                resizeMode='contain'
                className='h-5 w-5'
                />
            </TouchableOpacity>
            </View>
            {modalContent}
        </View>
        </View>
    </Modal>
  )
}

export default CustomModal
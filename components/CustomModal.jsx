import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import { useGlobalContext } from '../context/globalProvider'

const CustomModal = ({modalContent, modal, setModal}) => {
  const {darkMode} = useGlobalContext()
  return (
    <Modal
        animationType='slide'
        onRequestClose={()=>{setModal(false)}}
        visible={modal}
        transparent={true}
    >
        <View 
            className='h-full justify-center items-center'
        >
            <View className={`${darkMode ? 'bg-secondary' : 'bg-primary'} border-blue border-4 rounded-xl p-5 pt-10`}>
                
                <TouchableOpacity
                    className='absolute top-2 right-2'
                    onPress={() => {setModal(false)}}
                >
                    <Image 
                    source={icons.close}
                    resizeMode='contain'
                    className='h-5 w-5'
                    />
                </TouchableOpacity>
            
                {modalContent}
            </View>
        </View>
    </Modal>
  )
}

export default CustomModal
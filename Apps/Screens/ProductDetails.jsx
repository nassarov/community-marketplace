import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Button, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { Firestore, collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';


import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebaseConfig';



export default function ProductDetails({navigation}) {
    const {params}=useRoute();
    const [product, setProduct] = useState([]);
    // used to send user info to profile page so user can edit his posts
    const {user}=useUser();
    const db =getFirestore(app);
    const nav = useNavigation();//go back after delete post
    // Send Email message
    const sendEmailMessage=()=>{
        const subject = 'Regarding '+product.title;
        const body = 'Hello '+product.userName+"\n"+"I'am intrested in this product"
        Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body)
    }

    const shareButton=()=>{
        navigation.setOptions({
            headerRight:()=>(
                
                <Ionicons name="share-social" size={24} color="white" style={{marginRight:10}}
                onPress={()=>shareProduct()}
                />
                
            )
        })
    }
    // used to share product
    const  shareProduct=()=>{
        const content = {
            message:product?.title+"\n"+product?.desc+'\n'+product.image,
        }
        
        Share.share(content).then((resp)=>{
            console.log(resp);
        },(error)=>{
            console.log(error);
        })
    }

    // Used to share product
// const shareProduct = async () => {
//   try {
//     // Get the download URL of the image from Firebase Storage
//     const imageURL = await getDownloadURL(ref(storage, product.image));

//     // Download the image to a local URI
//     const localUri = await FileSystem.downloadAsync(
//       imageURL,
//       FileSystem.documentDirectory + 'product.jpg'
//     );

//     if (localUri) {
//       // Construct the message content
//       const message = product.title + "\n" + product.desc;

//       // Share the locally downloaded image along with the message
//       await Sharing.shareAsync(localUri.uri, { message });
//     } else {
//       console.log("Failed to download the image.");
//     }
//   } catch (error) {
//     // If sharing is canceled, handle the error accordingly
//     if (error.message === 'User canceled the action') {
//       console.log('Sharing canceled.');
//     } else {
//       console.error("Error sharing product:", error);
//     }
//   }
// };

        
    
    // user delete post
    const deleteUserPost =()=>{
        Alert.alert('Delete Post!!','Do you really want to delete this post ?',[
            {
                text:'Yes',
                onPress:()=>deleteFromFirestore()
            },
            {
                text:'Cancel',
                onPress:() =>console.log("cancelled"),
                style:'cancel'
            }
        ])
    }
    const deleteFromFirestore=async()=>{
        const q = query(collection(db,'UserPost'),where('title', '==', product.title));
        const snapShot = await getDocs(q);
        snapShot.forEach((doc) => {
            deleteDoc(doc.ref).then(resp=>{
                console.log(resp);
                nav.goBack();
            })
        });
    }
    
    useEffect(()=>{
        params&&setProduct(params.product);
        shareButton();
    },[params,navigation])
  return (
    <ScrollView className="bg-white">
      <Image source={{uri:product.image}} className="h-[380px] w-full"/>
      <View className="p-3">
        <Text className="text-[24px] font-bold ">{product?.title}</Text>
        <View className="items-baseline">
        <Text className="p-1 bg-blue-200 px-2 rounded-full text-blue-500 mt-2 font-bold ">{product?.category}</Text>
        </View>
        <Text className=" mt-3 text-[20px] font-bold">Description</Text>
        <Text className="text-[15px] text-gray-500 ">{product?.desc}</Text>
      </View>
      {/* User Info */}
      <View className="p-2 flex flex-row items-center gap-3 border-[1px] border-gray-200 bg-blue-100 mt-4">
            <Image source={{uri:product.userImage}} className="w-12 h-12 rounded-full "/>
            <View >
                <Text className="font-bold text-[18px]">{product.userName}</Text>
                <Text>{product.userEmail}</Text>
            </View>
      </View>
      {user?.primaryEmailAddress.emailAddress == product.userEmail?
      // if post seen by its publisher he have the option to delete the post
      <TouchableOpacity className="z-40 bg-red-500 rounded-full p-3 m-5"
      onPress={()=>deleteUserPost()}
      >
        <Text className="text-center text-white ">Delete Post</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity className="z-40 bg-blue-500 rounded-full p-3 m-5"
      onPress={()=>sendEmailMessage()}
      >
        <Text className="text-center text-white ">Send A Message</Text>
      </TouchableOpacity>
      }
      
    </ScrollView>
  )
}
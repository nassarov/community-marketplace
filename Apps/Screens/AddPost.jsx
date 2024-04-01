import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";


export default function AddPost() {
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const storage = getStorage();
  const [loading,setLoading]=useState(false);
  // use this to send the user with post to know who added this post
  const {user}=useUser();

  useEffect(() => {
    getCategoryList();
  }, []);
  // used to get Category List
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  // used to pick image from gallery
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

 

  const onSubmitMethod = async (value,actions) => {
    setLoading(true);
    //Convert uri to Blob file
    const resp = await fetch(image);
    const blob = await resp.blob();
    
    const storageRef = ref(storage, 'communityPost/'+Date.now()+'.jpg');
    // 'file' comes from the Blob or File API  file=BLOB

    uploadBytes(storageRef,blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadURL)=>{
        console.log(downloadURL);
        value.image=downloadURL;
        // to know this post from which user send user info
        value.userName=user.fullName,
        value.userEmail=user.primaryEmailAddress.emailAddress;
        value.userImage=user.imageUrl;  //user image 


        const docRef=await addDoc(collection(db,"UserPost"),value)
        if(docRef.id){
          setLoading(false);
          Alert.alert("Successful!!","Post Addded Successfully.")
          console.log("Documnet Added !")
          actions.resetForm();   
          setImage(null);
        }
      })
    })

  };

  return (
    <KeyboardAvoidingView className="flex-1" >
    <ScrollView className="p-10">
      <Text className="mt-5 text-[25px] font-bold">Add New Post</Text>
      <Text className="text-[18px] text-gray-500 mb-5 mt-2">
        Create New Post And Start Selling
      </Text>
      <Formik
        initialValues={{
          title: "",
          desc: "",
          category: "",
          address: "",
          price: "",
          image: "",
          userName:"",
          userEmail: "",
          userImage:"",
          createdAt:new Date().toISOString(),
        }}
        onSubmit={(value,actions) => onSubmitMethod(value,actions) }
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            ToastAndroid.show("Title must be  present", ToastAndroid.SHORT);
            errors.name = "Title must be  present";
          }
          return errors;
        }} >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ height: 100, width: 100 }}
                />
              ) : (
                <Image
                  source={require("./../../assets/images/defaultimage.jpg")}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                  }}
                />
              )}
            </TouchableOpacity>

            <TextInput 
              style={styles.input}
              placeholder="Title"
              value={values?.title}
              onChangeText={handleChange("title")}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={values?.desc}
              numberOfLines={5}
              onChangeText={handleChange("desc")}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={values?.price}
              keyboardType="number-pad"
              onChangeText={handleChange("price")}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={values?.address}
              onChangeText={handleChange("address")}
            />
            {/* category dropdown */}
            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
              <Picker
                selectedValue={values?.category}
                onValueChange={(itemValue) =>
                  setFieldValue("category", itemValue)
                }
              >
                {categoryList &&
                  categoryList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.name}
                    />
                  ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor:loading?'#ccc':'#007BFF',
              }} 
              disabled={loading}
                onPress={handleSubmit}
                className="p-5 bg-blue-500 rounded-full mt-10">

              {loading?
                <ActivityIndicator color='#fff'/>
                :
                  <Text className="text-white text-center text-[16px]">Submit</Text>
                }
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    textAlignVertical: "top",
  },
});
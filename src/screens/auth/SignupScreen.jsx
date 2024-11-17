import { StyleSheet, Text, View, TextInput, Pressable, Dimensions,Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { validationSchema } from '../../validations/validationSchema';

const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    const [genericValidationError, setGenericValidationError] = useState("")
    const [errorAddUser,setErrorAddUser] = useState(false)

    const [triggerSignup, result] = useSignupMutation()

    const dispatch = useDispatch()

    useEffect(()=>{
        if(result.status==="rejected"){
            console.log("Error al agregar el usuario", result)
            setErrorAddUser("Ups! No se pudo agregar el usuario")
        }else if(result.status==="fulfilled"){
            console.log("Usuario agregado con éxito")
            //console.log(result.data)
            dispatch(setUser(result.data))
        }
    },[result])

    const onsubmit = ()=>{
        //console.log(email,password,confirmPassword)
        //triggerSignup({email,password})
        try {
            validationSchema.validateSync({ email, password, confirmPassword })
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            triggerSignup({ email, password })
        } catch (error) {
            switch (error.path) {
                case "email":
                    console.log(error.message)
                    setErrorEmail(error.message)
                    break
                case "password":
                    console.log(error.message)
                    setErrorPassword(error.message)
                    break
                case "confirmPassword":
                    console.log(error.message)
                    setErrorConfirmPassword(error.message)
                    break
                default:
                    setGenericValidationError(error.message)
                    break
            }
        }
    }

    return (
      
        <LinearGradient
            colors={['#1C77C3', '#1C77C3']}
            start={{ x: 0, y: 0 }} // esquina superior izquierda
            end={{ x: 1, y: 1 }}   // esquina inferior derecha
            style={styles.gradient}
        >
            <View style={styles.Imagecontainer}>
            <Image
                source={require('../../../assets/images/logotumejorprecio.png')} // Ajusta la ruta según la ubicación de tu imagen
                style={styles.image}
            />  
            </View>
            <Text style={styles.title}>Tu Mejor Precio</Text>
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#C6C6C6"
                    placeholder="Email"
                    style={styles.textInput}
                />
                {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}

                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#C6C6C6"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />

                {( errorPassword) && <Text style={styles.error}>{errorPassword}</Text>}
                
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor="#C6C6C6"
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}

            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>
            {errorAddUser && <Text style={styles.error}>{errorAddUser}</Text>}
            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable onPress={()=>dispatch(setUser({email:"demo@mundogeek.com",token:"demo"}))}>
                    <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
                </Pressable>
            </View>
        </LinearGradient>
       
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors.blanco,
        fontFamily: "Montserrat - Black",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: colors.blanco,
        fontWeight: '700',
        letterSpacing: 1
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors.blanco,
        width: textInputWidth,
        color: colors.negro,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.blanco
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.naranjamamey,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: 200, // Ajusta el tamaño según tus necesidades
        height: 200,
        resizeMode: 'contain', // Puedes cambiarlo a 'cover' o 'stretch' según lo que necesites
      },
      error: {
        color: colors.naranjamamey,
        fontWeight: 'bold'
      }
})
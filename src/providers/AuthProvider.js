import React, { createContext, useEffect, useState } from "react";
import { auth, database } from "@/config/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import defaultWatchlist from "@/util/defaultWatchlist";
export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)

    const authStateChanged = async (authState) => {
        if (!authState) {
            setUser(null)
            return;
        }
        const userRef = ref(database, `/users/${authState.uid}`)
        onValue(userRef, (snapshot) => {
            var userData = snapshot.val()
            var watchListObj = userData.watchList;
            var watchList = []
            for (let pair in watchListObj) {
                watchList.push({
                    ...watchListObj[pair],
                    pair
                })
            }
            setUser({ ...userData, watchList, uid: authState.uid })
        })
    };

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                setUser,
                user,
                login: ({ email, password, setErrorMsg }) => {
                    return new Promise(async resolve => {
                        try {
                            await signInWithEmailAndPassword(auth, email, password).then(async (credential) => {
                                setUser(credential.user)
                                resolve("success")
                            })
                        }
                        catch (e) {
                            if (e.code === "auth/user-not-found") {
                                setErrorMsg({
                                    msg: "User Not found",
                                    color: "#fc4242"
                                })
                            }
                            else if (e.code === "auth/email-invalid") {
                                setErrorMsg({
                                    msg: "Email id is invalid",
                                    color: "#fc4242"
                                })
                            }
                            else if (e.code === "auth/wrong-password") {
                                setErrorMsg({
                                    msg: "Password is incorrect",
                                    color: "#fc4242"
                                })
                            }
                            else {
                                setErrorMsg({
                                    msg: "Something went wrong, try to turn on your internet",
                                    color: "#fc4242"
                                })
                                console.log(e)
                            }
                        }
                    })

                },
                register: ({ email, password, setErrorMsg, name }) => {
                    return new Promise(async resolve => {
                        try {
                            await createUserWithEmailAndPassword(auth, email, password).then((credential) => {
                                const userRef = ref(database, `/users/${credential.user.uid}`)
                                const watchListRef = ref(database, `/users/${credential.user.uid}/watchList`)
                                set(userRef, {
                                    email: email,
                                    name: name
                                }).then(() => {
                                    set(watchListRef, defaultWatchlist).then(() => {
                                        setUser(credential.user)
                                        resolve("success")
                                    })
                                })
                            })
                        }
                        catch (e) {
                            if (e.code === "auth/email-already-in-use") {
                                setErrorMsg({
                                    msg: "This email is already in use another email or try to login",
                                    color: "#fc4242"
                                })
                            }
                            else if (e.code === "auth/wrong-password") {
                                setErrorMsg({
                                    msg: "Password is incorrect",
                                    color: "#fc4242"
                                });
                            } if (e.code === "auth/user-disabled") {
                                setErrorMsg({
                                    msg: "User account is disabled",
                                    color: "#fc4242"
                                });
                            } else if (e.code === "auth/too-many-requests") {
                                setErrorMsg({
                                    msg: "Too many unsuccessful login attempts. Please try again later.",
                                    color: "#fc4242"
                                });
                            } else if (e.code === "auth/weak-password") {
                                setErrorMsg({
                                    msg: "Password is too weak. Please choose a stronger password.",
                                    color: "#fc4242"
                                });
                            } else {
                                setErrorMsg({
                                    msg: "An error occurred during sign-in. Try to turn on your internet",
                                    color: "#fc4242"
                                });
                                console.log(e)
                            }
                        }
                    })
                },
                logout: async () => {
                    try {
                        await signOut(auth)
                        setUser(null)
                    }
                    catch (e) {
                        console.error(e);
                    }
                },
                updateName: (name, setInputDailogOpen) => {
                    const userRef = ref(database, `/users/${user.uid}/displayName`)
                    set(userRef, name).then(() => {
                        setInputDailogOpen(false)
                        setUser({
                            ...user,
                            displayName: name,
                        })
                        if (Platform.OS === "android") {
                            alert("You name has been updated")
                        }
                    })
                        .catch((e) => {
                            console.log(e)
                        })
                },
                fetchUser: () => {
                    return new Promise(resolve => {
                        const userRef = ref(database, `/users/${user.uid}`)
                        onValue(userRef, (snapshot) => {
                            var userData = snapshot.val()
                            var watchListObj = userData.watchList;
                            var watchList = []
                            for (let pair in watchListObj) {
                                watchList.push({
                                    ...watchListObj[pair],
                                    pair
                                })
                            }
                            resolve({ ...userData, watchList, uid: user.uid })
                        })
                    })
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
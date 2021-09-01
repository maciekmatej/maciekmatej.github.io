import { createStore } from 'vuex';
import {
  createUserWithEmailAndPassword, signOut, updateProfile, signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  auth, setDoc, db, doc,
} from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    authTabShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuthTabSwitch: (state) => {
      state.authTabShow = !state.authTabShow;
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  getters: {
    // authModalShow: (state) => state.authModalShow,  <= use mapGetters inside computed property
  },
  actions: {
    async register({ commit }, payload) {
      const userCred = await createUserWithEmailAndPassword(
        auth, payload.email, payload.password,
      );

      await setDoc(doc(db, 'users', userCred.user.uid), {
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
        user_type: payload.user_type,
      });

      await updateProfile(auth.currentUser, {
        diplayName: payload.name,
      });
      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    async login({ commit }, payload) {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
      commit('toggleAuth');
    },
    async logout({ commit }) {
      const user = auth.currentUser;

      if (user) {
        await signOut(auth);
        commit('toggleAuth');
      }
    },
    async succesLog({ commit }) {
      setTimeout(() => {
        commit('toggleAuthModal');
      }, 2000);
    },
  },
});

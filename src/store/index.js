import {createStore} from "vuex";
import axiosClient from "axios";

const store = createStore({
    state: {
        loading: false,
        contacts: {
            data: [],
            links: [],
            meta: {}
        },
        currentSurvey: {
            data: {},
            loading: false,
        },
        notification: {
            message: null,
            show: false,
            type: ''
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
        surveys: {
            data: [],
            loading: false,
            links: [],
        },
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        }
    },
    getters: {},
    actions: {
        
        login({commit}, user) {
            axiosClient.post('/auth/login', user)
                .then(response => {
                    commit('setUser', response.data.data.user);
                    commit('setToken', response.data.data.token);
                    return response
                });
        },
        logout({commit}) {
            axiosClient.post('/auth/logout')
                .then(response => {
                    commit('logout');
                    return response
                });
        },
        register({commit}, user) {
            axiosClient.post('/auth/register', user)
                .then(response => {
                    commit('setUser', response.data.data.user);
                    commit('setToken', response.data.data.token);
                    return response
                });
        },
        
        getUser({commit}) {
            axiosClient.get('auth/user')
                .then(response => {
                    commit('setUser', response.data.data.user);
                    return response;
                })
        }
    },
    mutations: {
        logout: state => {
            state.user.data = {};
            state.user.token = null;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setUser(state, user) {
            state.user.data = user;
        },
        setToken(state, token) {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
        },
        setContacts(state, contacts) {
            state.contacts.data = contacts.data;
            state.contacts.meta = contacts.meta;
            state.contacts.links = contacts.links;
        },
        saveSurvey(state, survey) {
            state.surveys.data = [...state.surveys.data, survey];
        },
        setCurrentSurveyLoading(state, loading) {
            state.currentSurvey.loading = loading;
        },
        setCurrentSurvey(state, survey) {
            state.currentSurvey.data = survey;
        },
        setSurveysLoading(state, loading) {
            state.surveys.loading = loading;
        },
        setSurveys: (state, surveys) => {
            state.surveys.links = surveys.meta.links;
            state.surveys.data = surveys.data;
            state.surveys.meta = surveys.meta;

        },
        updateSurvey(state, survey) {
            state.surveys.data = state.surveys.map(survy => {
                if (survy.id === survey.id) {
                    return survey
                }
                return survy
            })
        },
        notify: (state, {message, type})=>{
            state.notification.show = true;
            state.notification.message = message;
            state.notification.type = type;
            setTimeout(()=>{
                state.notification.show = false
            }, 5000)
        }
    },
    modules: {}
});

export default store;


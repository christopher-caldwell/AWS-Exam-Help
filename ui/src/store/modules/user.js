import service from '@/services/user'
import { getItemFromLocalStorage, writeToLocalStorage } from '@/utils/localStorage'

export default {
	namespaced: true,
	state: {
		role: '',
		givenName: '',
		familyName: '',
		pictureUrl: '',
		locale: '',
		email: '', 
		id: '',
	},
	getters: {
		allowedRoutes(state){
			return state.allowedRoutes
		},
		usersName(state){
			if(state.givenName && state.familyName){
				return state.givenName + ' ' + state.familyName
			} else {
				return ''
			}
		}
	},
	actions: {
		async registerUser({ commit }, userInformation){
			commit('REGISTER_USER', userInformation)
		},
		async googleOauth({ commit, dispatch }, { codeToSend, isLogin }){
			const { userInformation, token } = isLogin
				? await service.googleOauthLogin(codeToSend)
				: await service.googleOauthRegister(codeToSend)
				dispatch('session/beginNewSession', token, { root: true })
			commit('UPDATE_USER', userInformation)
		},
		restoreUserToStore({ commit }){
			const prevUser = getItemFromLocalStorage('user')
			if(prevUser){
				commit('UPDATE_USER', prevUser)
			}
		}
	},
	mutations: {
		UPDATE_USER(state, userInformation){
			Object.keys(userInformation).forEach(key => {
				state[key] = userInformation[key]
			})
			writeToLocalStorage('user', userInformation)
		}
	}
}
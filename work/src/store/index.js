import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    role: null,
    formIsOpen: false,
    bookingIsOpen: false,
    bookingId: null,
    editableSiteId: null,
    querySite: null,
    sites: [
      {
        id: 1,
        url: 'pravda.com.ua',
        visibility: false,
        attendance: 1000,
        lang: {
          code:"en",
          title:"EN",
        },
        price: 100,
        advertisingType: {
          id: 3,
          title: 'рекламний пост',
        }
      },
      {
        id: 2,
        url: 'strana.ua',
        visibility: true,
        attendance: 3000,
        lang: {
          code:"en",
          title:"EN",
        },
        price: 300,
        advertisingType: {
          id: 2,
          title: 'банер y футері',
        },
      },
      {
        id: 3,
        url: 'korrespondent.net',
        visibility: true,
        attendance: 5000,
        lang: {
          code:"en",
          title:"EN",
        },
        price: 500,
        advertisingType: {
          id: 2,
          title: 'банер y футері',
        },
      },
      {
        id: 4,
        url: 'obozrevatel.com',
        visibility: true,
        attendance: 10000,
        lang: {
          code:"en",
          title:"EN",
        },
        price: 1000,
        advertisingType: {
          id: 2,
          title: 'банер y футері',
        },
      },
    ],
    filteredRange: null,
  },
  getters: {
    getRole: ({role}) => role,
    getSites: ({sites}) => sites,
    getVisibleSites: ({sites, filteredRange: f}) => f &&
      sites.filter(({visibility: v, attendance: a}) => v && a >= f[0] && a <= f[f.length -1]) ||
      sites.filter(({visibility}) => visibility),
    getEditableSiteData: ({sites, editableSiteId}) => editableSiteId &&
      sites.filter(({id}) => id === editableSiteId)[0] || null,
    getQuerySite: ({querySite}) => querySite,
    getRange: ({sites}) => {
      const attendancesArr = sites.filter(({visibility}) => visibility).map(({attendance}) => attendance);
      return [Math.min(...attendancesArr), Math.max(...attendancesArr)]
    },
    getCurrentRange: ({filteredRange}) => filteredRange,
    getSitesUrls: ({sites}) => sites.map( ({url}) => url),
  },
  actions: {},
  mutations: {
    setRole(state, payload) {
      state.role = payload;
    },
    addSite(state, payload) {

      const result = [
        ...state.sites, {
          id: ++state.sites.length,
          ...payload,
        },
      ];

      state.sites = null;
      state.sites = result;
    },

    updateSiteById(state, payload) {
      const siteIndex = state.sites.map(({id}) => id).indexOf(payload.id);
      state.sites.splice(siteIndex, 1, payload.data);
    },

    updateFormVisibilityStatus(state, payload) {
      state.formIsOpen = payload;
    },

    updateBookingVisibilityStatus(state, payload) {
      state.bookingIsOpen = payload;
    },

    setEditableSiteId(state, payload) {
      state.editableSiteId = payload;
    },

    setQuerySite(state, payload) {
      state.querySite = payload;
    },

    setFilteredRange(state, payload) {
      state.filteredRange = payload;
    },

    setBookingId(state, payload) {
      state.bookingId = payload;
    },

    bookSite(state, payload) {
      const siteIndex = state.sites.map(({id}) => id).indexOf(state.bookingId);
      const result = [...state.sites];
      result[siteIndex].booked = payload;
      state.sites = null;
      state.sites = result;
    }

  }
})
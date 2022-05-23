export default {
    updateAuth(state, uid) {
        state.uid = uid;
    },
    initApp(state, app) {
        state.app = app;
    },
    getDB(state, db) {
        state.database = db;
    },
    getPosts(state, posts) {
        state.posts = posts;
    }
}
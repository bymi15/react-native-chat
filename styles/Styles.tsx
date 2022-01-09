import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  //Login
  loginContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },

  nameContainer: {
    marginTop: 40,
  },

  logo: {
    width: "auto",
    resizeMode: "contain",
    height: 140,
    marginTop: 70,
  },

  nameTextInput: {
    fontSize: 18,
  },

  selectImageContainer: {
    flex: 1,
    alignSelf: "center",
    marginTop: 20,
    width: "60%",
  },

  avatarBig: {
    height: 100,
    width: 100,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
  },

  //chat
  chatContainer: {
    backgroundColor: "#032f61",
    flex: 1,
  },

  sendSection: {
    flexDirection: "row",
    margin: 15,
  },

  chatTextInput: {
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },

  chatItemHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  flatListItem: {
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
    alignItems: "flex-end",
  },

  chatMessageWrapper: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderRadius: 7,
    elevation: 5,
    backgroundColor: "#fff",
  },

  chatText: {
    fontSize: 16,
  },

  byText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },

  dateText: {
    fontSize: 12,
    fontStyle: "italic",
    alignSelf: "flex-end",
    marginTop: 5,
  },

  avatarSmall: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 2,
  },
});

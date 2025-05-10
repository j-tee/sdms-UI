export default ({ config }) => {
    const isProd = process.env.APP_ENV === "production";
  
    return {
      ...config,
      name: isProd ? "SDMS (Prod)" : "SDMS (Staging)",
      slug: isProd ? "sdms-prod" : "sdms-staging",
      extra: {
        apiBaseUrl: isProd
          ? "https://sdmsapi.alphalogiquetechnologies.com/"
          : "http://192.168.100.17:3000/",
        ocpPrimaryKey: "cb41472025e1497cbde5e5a6b490c838",
        ocpSecondaryKey: "9dddee95486a492cb7e7eba2a22b48e6",
        momoProvisioningUrl: "https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/",
        callBackUrl: isProd
          ? "https://sdmsapi.alphalogiquetechnologies.com"
          : "http://192.168.100.17",
        mtnCollectionUrl: "https://sandbox.momodeveloper.mtn.com/collection/",
        momoUserUrl: isProd
          ? "https://sandbox.momodeveloper.mtn.com/v1_0/apiuser"
          : undefined,
        tokenUrl: isProd
          ? "https://sandbox.momodeveloper.mtn.com/collection/token/"
          : undefined,
        siteKey: "6LeqrqoqAAAAAOOSUuOlcmNRA7BsxUEkw6qSl1o0",
        siteSecret: "6LeqrqoqAAAAAKeGPJRQdBHrt58xs1PHol_C8kLV",
        gesRoles: "circuit_supervisor,circuit_staff,district_director,district_staff,regional_director,regional_staff,ges_director,ges_staff,education_ministry",
        schoolRoles: "admin,employee,teacher,secretary,parent,student,owner,principal,vice_principal,bursar,librarian,counselor,nurse,security,driver,cleaner,cook,gardener,watchman,storekeeper,other",
        systemAdminRoles: "system_admin,alphalogique_admin,alphalogique_staff",
        environment: isProd ? "production" : "staging"
      }
    };
  };
  
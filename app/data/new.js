// app/data/bankData.js
export const bankData = {
  bank: {
    name: "Commercial Bank of Ethiopia",
    branches: [
      {
        branchId: "BR001",
        branchName: "ADARE BRANCH",
        location: {
          city: "HAWASSA",
          state: "SIDAMA",
        },
        ipAddresses: {
          wanIp: "10.208.224",
          lanIp: "10.112.1.2",
          routerConfig: {
            fileName: "router-config-br001.txt",
            filePath: "/configs/br001/router-config.txt",
            details: {
              model: "Cisco ISR 4451",
              firmware: "16.9.3",
            },
          },
          switchConfig: {
            fileName: "switch-config-br001.txt",
            filePath: "/configs/br001/switch-config.txt",
            details: {
              model: "Cisco Catalyst 9300",
              ports: 48,
            },
          },
        },
        contactPersons: {
          manager: {
            name: "ABEBE AYELE",
            phoneNumber: "+2519332658",
            email: "AYELE@CBE.COM.ET",
          },
          operationManager: {
            name: "BEYENE KEBEDE",
            phoneNumber: "+251932542585",
            email: "BEYENE@CBE.COM.ET",
          },
        },
        atms: [
          {
            atmName: "ADARE BR. ATM 1",
            atmId: "AHW00034",
            atmIpAddress: "10.112.27.194",
          },
          {
            atmName: "ADARE BR. ATM 2",
            atmId: "AHW00074",
            atmIpAddress: "10.112.27.195",
            type: "lobby",
          },
        ],
      },
      {
        branchId: "BR002",
        branchName: "BORICHA BRANCH",
        location: {
          city: "BORICHA",
          state: "SIDAMA",
        },
        ipAddresses: {
          wanIp: "10.208.225",
          lanIp: "10.113.1.2",
          routerConfig: {
            fileName: "router-config-br002.txt",
            filePath: "/configs/br002/router-config.txt",
            details: {
              model: "Juniper SRX340",
              firmware: "21.2R1",
            },
          },
          switchConfig: {
            fileName: "switch-config-br002.txt",
            filePath: "/configs/br002/switch-config.txt",
            details: {
              model: "Arista 7020R",
              ports: 24,
            },
          },
        },
        contactPersons: {
          manager: {
            name: "KEBEDE TESFAYE",
            phoneNumber: "+251934512345",
            email: "KEBEDE.T@CBE.COM.ET",
          },
          operationManager: {
            name: "SELAMAWIT GEBRE",
            phoneNumber: "+251932876543",
            email: "SELAMAWIT@CBE.COM.ET",
          },
        },
        atms: [
          {
            atmName: "BORICHA BR. ATM 1",
            atmId: "BOR00012",
            atmIpAddress: "10.113.27.201",
          },
          {
            atmName: "BORICHA BR. ATM 2",
            atmId: "BOR00013",
            atmIpAddress: "10.113.27.202",
            type: "drive-thru",
          },
        ],
      },
      {
        branchId: "BR003",
        branchName: "DARARA BRANCH",
        location: {
          city: "DARARA",
          state: "SIDAMA",
        },
        ipAddresses: {
          wanIp: "10.208.226",
          lanIp: "10.114.1.2",
          routerConfig: {
            fileName: "router-config-br003.txt",
            filePath: "/configs/br003/router-config.txt",
            details: {
              model: "Cisco ASR 1001-X",
              firmware: "17.3.2",
            },
          },
          switchConfig: {
            fileName: "switch-config-br003.txt",
            filePath: "/configs/br003/switch-config.txt",
            details: {
              model: "Cisco Nexus 3048",
              ports: 48,
            },
          },
        },
        contactPersons: {
          manager: {
            name: "TSEGAYE MULAT",
            phoneNumber: "+251935678901",
            email: "TSEGAYE@CBE.COM.ET",
          },
          operationManager: {
            name: "MESERET ALEMU",
            phoneNumber: "+251933214567",
            email: "MESERET@CBE.COM.ET",
          },
        },
        atms: [
          {
            atmName: "DARARA BR. ATM 1",
            atmId: "DAR00056",
            atmIpAddress: "10.114.27.210",
          },
          {
            atmName: "DARARA BR. ATM 2",
            atmId: "DAR00057",
            atmIpAddress: "10.114.27.211",
            type: "lobby",
          },
        ],
      },
      {
        branchId: "BR020",
        branchName: "HAWASSA REFERAL BRANCH",
        location: {
          city: "HAWASSA",
          state: "SIDAMA",
        },
        ipAddresses: {
          wanIp: "10.208.243",
          lanIp: "10.131.1.2",
          routerConfig: {
            fileName: "router-config-br020.txt",
            filePath: "/configs/br020/router-config.txt",
            details: {
              model: "Huawei AR6120",
              firmware: "V300R019",
            },
          },
          switchConfig: {
            fileName: "switch-config-br020.txt",
            filePath: "/configs/br020/switch-config.txt",
            details: {
              model: "HP 5130 EI",
              ports: 24,
            },
          },
        },
        contactPersons: {
          manager: {
            name: "GETACHEW BELAY",
            phoneNumber: "+251936789012",
            email: "GETACHEW@CBE.COM.ET",
          },
          operationManager: {
            name: "TSEHAY ASFAW",
            phoneNumber: "+251934321098",
            email: "TSEHAY@CBE.COM.ET",
          },
        },
        atms: [
          {
            atmName: "HAWASSA REF. ATM 1",
            atmId: "HWR00987",
            atmIpAddress: "10.131.27.250",
          },
          {
            atmName: "HAWASSA REF. ATM 2",
            atmId: "HWR00988",
            atmIpAddress: "10.131.27.251",
            type: "outdoor",
          },
        ],
      },
    ],
  },
};

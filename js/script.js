const {DateTime} = luxon;

const {createApp} = Vue;

createApp({
    data(){
        return{

            userProfile: {
                name: 'Persona a caso',
                avatar: 'img/procione.png'
            },

            activeChat: 0,

            serchChat: '',

            newMessage: '',

            newMessageNoSpace: '',

            darkMode: false,

            menuIndex: null,

            hiddenMenu: true,

            responseMessage: '',

            contacts: [
                {
                    name: 'Michele',
                    avatar: 'img/cervo.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'img/koala.png',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'img/gatto.png',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: 'img/panda.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: 'img/scimmia.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: 'img/volpe.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: 'img/lupo.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: 'img/orso.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                },
            ]

        };
    },

    methods:{
        // moltoUtile(){

        // },

        changeActiveChat(indice){
            this.activeChat = indice;
        },

        addNevMessage(){
        
            // rimuovo tutti gli spazi bianchi
            this.newMessageNoSpace = this.newMessage.replace(/\s/g, "");


            // verifico che nel campo ci sia almeno un carattere
            if(this.newMessageNoSpace.length >= 1){

                this.contacts[this.activeChat].messages.push(
                    {
                        date: DateTime.now().toFormat('HH:mm'),
                        message: this.newMessage,
                        status: 'sent'
                    },
                    
                );

                this.newMessage = '';

                // API per risposta random
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://api.quotable.io/random?maxLength=60',
                    headers: { }
                  };
                  
                  axios.request(config)
                  .then((response) => {
                    return this.responseMessage =(JSON.stringify(response.data.content));
                  })
                  .catch((error) => {
                    console.log(error);
                  });


                // time out 1 secondo per risposta
                setTimeout(() => {
                    this.contacts[this.activeChat].messages.push(
                        {
                            date: DateTime.now().toFormat('HH:mm'),
                            message: this.responseMessage,
                            status: 'received'
                        },
                    );
                  }, 1000);
    
            }
        },

        searchContact(){

            this.contacts.forEach(person => {
                if(person.name.toLowerCase().includes(this.serchChat.toLowerCase())){
                    person.visible = true;
                }else{
                    person.visible = false;
                };
            });
            
        },
        

        setDarkMode(){
            this.darkMode = !this.darkMode;
        },

        showMenu(index){
            this.menuIndex = index;

            this.hiddenMenu = !this.hiddenMenu
        },


        delateMessage(index){
            this.contacts[this.activeChat].messages.splice(index, 1);
        },

    },

    // computed: {
    //     filteredContacts() {
    //       return this.contacts.filter(contact => 
    //         contact.name.toLowerCase().includes(this.serchChat.toLowerCase())
    //       );
    //     }
    //   },


}).mount("#container")

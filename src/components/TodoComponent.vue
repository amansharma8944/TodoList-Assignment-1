<template>
    <div class="leftcontainer">
        <h4 class="todoHeading">To Do</h4>
        <div class="inside_left_container">
            <div class="inputForTodo">
                <div class="inputForaddingtodoNextdiv">
                    <input type="text" class="inputForaddingtodo" v-model="newTask" placeholder="Add a new task"
                        v-on:keyup.enter="addtoTheList()" />
                    <font-awesome-icon :icon="['fas', 'plus']" class="hoverpoitner"
                        :style="{ cursor: 'pointer', height: '27px' }" v-on:click="addtoTheList()" />
                </div>
            </div>

            <div class="listingALlTOdo">
                <div class="PendingTask">
                    <h4 class="tasknameHeading ">Pending Task</h4>
                    <ul class="ulfullwidth">
                        <p v-if="pendingTask.length <= 0" class="indicatorofEmpty"> No Pending Task</p>
                        <li v-for="i in pendingTask" :key="i.id" class="listviewoftask full_li_width">
                          
                            <label class="checkbox-container">
                                <input type="checkbox" v-model="i.isDone" class="custom-checkbox"
                                    @click="checkboxClicked(i)" />
                                <span class="checkmark"></span>
                            </label>
                            <p v-show="i.editMode"></p>
                            <input v-show="i.editMode" type="text" class="taskShowingTitle" v-model="i.task"
                                @keyup.enter="FinalEdit(i)">
                            <p v-if="!i.editMode" class="taskShowingTitle">{{ i.task }}</p>

                            <font-awesome-icon v-if="!i.editMode" :icon="['fas', 'pen-to-square']" class="hoverclass"
                                style="color:#007bff" v-on:click="editmodeclicked(i)" />
                            <font-awesome-icon v-if="!i.editMode" :icon="['fas', 'trash']" v-on:click="deletetask(i.id)"
                                class="hoverclass" style="color:red;" />
                            <font-awesome-icon v-if="i.editMode" :icon="['fas', 'xmark']" v-on:click="cancelEdit(i)"
                                class="hoverclass" />
                            <font-awesome-icon v-if="i.editMode" :icon="['fas', 'check']" v-on:click="FinalEdit(i)"
                                class="hoverclass" />

                        </li>
                    </ul>

                </div>

                <div class="CompletedTask">
                    <h4 class="tasknameHeading ">Done Tasks</h4>
                    <p v-if="doneTask.length <= 0" class="indicatorofEmpty"> No Done Task</p>
                    <ul class="ulfullwidth">
                        <li v-for="i in doneTask" :key="i.id" class="listviewoftask full_li_width">
                            <label class="checkbox-container">
                                <input type="checkbox" v-model="i.isDone" class="custom-checkbox"
                                    @click="checkboxClicked(i)" />
                                <span class="checkmark"></span>
                            </label>
                            <!-- <input type="checkbox" v-model="i.isDone" class="custom-checkbox" /> -->
                            <p class="taskShowingTitle donetaskShowLine" style="color:green;">{{ i.task }}</p>
                            <!-- <font-awesome-icon :icon="['fas', 'pen-to-square']" /> -->
                            <font-awesome-icon :icon="['fas', 'trash']" v-on:click="deletetask(i.id)" class="hoverclass"
                                style="color:red;" />

                        </li>
                    </ul>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import { db } from '@/firebase/firebase'

export default {
    name: 'TodoComponent',
    data() {
        return {
            newTask: '',
            taskList: []
        }
    },
    computed: {
        pendingTask() {
            return this.taskList.filter(task => !task.isDone)
        },
        doneTask() {
            return this.taskList.filter(task => task.isDone)
        }
    },
    methods: {
        addtoTheList() {
            console.log(this.newTask)
            if (this.newTask.trim().length <= 0) {
                alert('Please enter a task')
                return
            }

            console.log(this.taskList)
            db.collection("TodoTask").add({
                id: Date.now(),
                task: this.newTask,
                isDone: false,
                editMode: false,
                originalContent: this.newTask
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            this.newTask = ''
        },
        async deletetask(id) {

            const docRef = db.collection("TodoTask").doc(id);
            const docSnap = await docRef.get();
            console.log(docSnap)

            if (!docSnap.exists) {
                console.error("Document does not exist or was already deleted.");
                return;
            }

            await docRef.delete();
            console.log("Document successfully deleted!");
        },
        editmodeclicked(id) {
            id.editMode = true
        },
        cancelEdit(i) {
            i.editMode = false
            i.task = i.originalContent
        },
        async FinalEdit(i) {
            if (i.task.trim().length <= 0) {
                alert('Please enter a task')
                return
            }
            
            i.editMode = false
            i.originalContent = i.task
            var washingtonRef = db.collection("TodoTask").doc(i.id);

           
            return washingtonRef.update({
                task: i.task
                
            })
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                   
                    console.error("Error updating document: ", error);
                })

        }
        ,
        async checkboxClicked(i) {
            var washingtonRef = db.collection("TodoTask").doc(i.id);

            
            return washingtonRef.update({
                isDone: !i.isDone
            })
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                   
                    console.error("Error updating document: ", error);
                });

        }
    },
    mounted() {
        console.log(process.env.appId)

        db.collection("TodoTask").onSnapshot((querySnapshot) => {
            this.taskList = [];
            querySnapshot.forEach((doc) => {

                console.log(doc.data(), doc.id)
                this.taskList.push({
                    id: doc.id,
                    task: doc.data().task,
                    isDone: doc.data().isDone,
                    editMode: false,
                    originalContent: doc.data().task
                })
            });
        });
    }

}
</script>

<style scoped>
.taskShowingTitle::-webkit-scrollbar {
    display: none;
}
.tasknameHeading {
    font-family: "Patrick Hand", cursive;
    font-weight: 400;
    font-style: normal;
    line-height: 0px;
    font-size: 15px;
    color: orange;
    letter-spacing: 1px;
}

.indicatorofEmpty {
    font-family: "Patrick Hand", cursive;
    font-weight: 400;
    font-style: normal;
    line-height: 0px;
    font-size: 15px;
    /* color: orange; */
    letter-spacing: 1px;
    width: 100%;
    text-align: center;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;

}

.todoHeading {
    font-family: "Patrick Hand", cursive;
    font-weight: 400;
    font-style: normal;
    line-height: 0px;
    font-size: 25px;
    color: black;
}

.listviewoftask {
    display: flex;
    align-items: center;
    width: 80%;
    height: 50.4px;
}

.leftcontainer {
    width: 100vw;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;

}

.inside_left_container {
    width: 50%;
    /* border: 1px solid black; */
    min-height: 90%;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #eee7e7;
    box-shadow: 1px 2px 5px 0px #dcd2d2;
}

.inputForTodo {
    width: 75%;
    /* border: 1px solid black; */
    /* flex: 0.2; */
    display: flex;
    align-items: end;
    justify-content: center;
    margin-top: 0px;
    height: 10vh;
}

.inputForaddingtodo {
    width: 80%;
    border: 0px;
    height: 89%;
    outline: none;
    color: black;
    /* overflow: scroll; */
}

.inputForaddingtodoNextdiv {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6vh;
    height: 6vh;
    border: 1px solid black;
    padding: 0px 10px;
    border-radius: 10px;
}

.listingALlTOdo {
    width: 75%;
    border: 1px solid black;
    margin-top: 5vh;
    min-height: 70vh;
    border-radius: 11px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    margin-bottom: 11px;
    padding: 16px;
}

.CompletedTask {
    flex: 0.5;
    width: 100%;
    min-height: 36vh;

}

.PendingTask {
    flex: 0.5;
    width: 100%;
    min-height: 36vh;

}

.donetaskShowLine {
    text-decoration: line-through;
}

.taskShowingTitle {
    width: 58%;
    color: black;
    overflow: scroll;
}

.ulfullwidth {
    width: 100%;
    padding: 0px;
}

.full_li_width {
    width: 100%;
    justify-content: space-between;
}

.hoverclass {
    cursor: pointer;
}

.hoverpoitner:hover {
    cursor: pointer;
}

/* Hide default checkbox */
.custom-checkbox {
    display: none;
}

/* Custom checkbox container */
.checkbox-container {
    display: inline-block;
    position: relative;
    width: 20px;
    /* Adjust size */
    height: 20px;
    cursor: pointer;
}

/* Checkbox background */
.checkmark {
    width: 100%;
    height: 100%;
    /* background-color: #ffebeb; */
    border-radius: 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    -webkit-transition: all 0.3sease;
    transition: all 0.3sease;
    position: relative;
}

/* Checkmark (✔) when checked */
.custom-checkbox:checked+.checkmark::before {
    content: "\2714";
    font-size: 23px;
    color: orange;
    font-weight: bold;
    position: absolute;
    left: 6px;
}
</style>

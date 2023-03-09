<script setup lang="ts">
import { onMounted } from 'vue'
import { darkTheme, NConfigProvider, NDivider, NStatistic, NModal, NCard, NSpin } from 'naive-ui'
import { NGrid, NGi, NH2, NH4 } from 'naive-ui'
import { useSingleStoreDataStore } from '~~/store/singleStoreDataStore';
import { useVibrate } from '@vueuse/core'

useHead({
  titleTemplate: () => `Sushi - Home`,
});

const { vibrate, isSupported } = useVibrate({ pattern: [300, 100, 300] })
const data = useSingleStoreDataStore()

const callInfo = reactive<{myTicket : number | null, timeToCall: number | null}>({
    myTicket: null,
    timeToCall: null
})

function setTicket(myTicket: number, timeToCall: number){
    callInfo.myTicket = myTicket
    callInfo.timeToCall = timeToCall
}

watch( data ,() => {
    if(
        callInfo.myTicket
        && callInfo.timeToCall
        && data.storeData
        && callInfo.myTicket - data.storeData.singleStoreQueue.boothQueue[0] <= callInfo.timeToCall
    ){
        useNuxtApp().$toast.info('Your ticket is near!');
        isSupported && vibrate()
        return
    }
})

onMounted(() => {
    const storeID = localStorage.getItem("storeID");

    if(storeID){
        data.setLoading();
        data.getStoreData(storeID)
    }
})

</script>

<template>
<n-config-provider :theme="darkTheme">

    <n-modal :show="data.initLoading">
        <n-card
            style="width: 600px"
            title="Data Loading"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <div style="text-align: center;">
                <n-spin size="large" />
            </div>

            <NH2 style="text-align: center;">
                Loading ...
            </NH2>
        </n-card>
    </n-modal>

    <div>

        <template v-if="!data.storeData">
            <div style="display: flex; justify-content: center; align-items: center; height: 80vh;">
                <n-h4>
                    Please select a store from the top right selector.
                </n-h4>
            </div>
        </template>

        <template v-if="data.storeData">

            <n-divider title-placement="center">
                General Info <Icon name="fluent-emoji-flat:identification-card" style="margin-left: 5px;"/>
            </n-divider>

            <n-grid x-gap="12" :cols="2">
                <n-gi class="grid-items">
                    <n-statistic label="Minutes">
                        <NH2 style="font-size: 3rem;">
                        {{ data.storeData.allStoreData.wait }}
                        </NH2>
                    </n-statistic>
                </n-gi>
            
                <n-gi class="grid-items">
                    <n-statistic label="Queue wait">
                        <NH2 style="font-size: 3rem;">
                        {{ data.storeData.allStoreData.waitingGroup }}
                    </NH2>
                    </n-statistic>             
                </n-gi>
            </n-grid>

            <n-divider title-placement="center">
                Queue ticket <Icon name="fluent-emoji-flat:ticket" style="margin-left: 5px;"/>
            </n-divider>

            <n-grid x-gap="12" :cols="3">
                
                <n-gi 
                    class="grid-items"
                    v-for="v in data.storeData.singleStoreQueue.boothQueue"
                >
                    <n-h2>
                        {{ v }}
                    </n-h2>
                </n-gi>
              
            </n-grid>

            <n-divider title-placement="center">
                <InputTicket @setTicket="setTicket" />
            </n-divider>

            <template v-if="callInfo.myTicket">
                <n-grid x-gap="12" :cols="2">
                
                <n-gi class="grid-items">
                    <n-statistic label="Your ticket">
                        {{ callInfo.myTicket }}
                    </n-statistic> 
                </n-gi>

                <n-gi class="grid-items">
                    <n-statistic label="Left">
                        {{ callInfo.myTicket - data.storeData.singleStoreQueue.boothQueue[0] }}
                    </n-statistic> 
                </n-gi>
              
            </n-grid>

            </template>

        </template>

    </div>
</n-config-provider>
</template>


<style>
.grid-items {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
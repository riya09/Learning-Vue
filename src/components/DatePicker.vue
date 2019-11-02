<template>
    <div class="wrapper">
        <div v-if="showDates" class="calendar-wrapper">
            <button class="prev" @click="prev">Prev</button>
            <button class="next" @click="next" :class = "[buttonDisabled() ? 'disabled':'']">Next</button>
            <h4 class="date-header" @click="getMonths">
                <span>{{months[currMonth]}} </span>
                <span>{{currYear}}</span>
            </h4>
            <div class="weeks">
                <span v-for="(week,index) in weeks" @click="selectedDate" :key="index">{{week}}</span>
            </div>
            <div class="dates">
                <span v-for="(number,index) in numberOfDays"
                      @click="selectedDate(number)"
                      :key="index" :class="[dateDisabled(number) ? 'disabled date':'date']"
                      :style="[number === 1 ? {'grid-column': offset}:{'grid-column':0}]">
                    {{number}}
                </span>
            </div>
        </div>
        <div v-if="showMonths" class="months">
            <h4 @click="getYears" class="curr-year"><span>{{currYear}}</span></h4>
            <div class="month-wrapper">
                <span v-for="(month,index) in months" :key="index"  :class="[monthDisabled(index) ? 'disabled month':'month']"
                      @click="getDates(index)">{{month}}</span>
            </div>
        </div>
        <div v-if="showYears" class="years">
            <button class="prev-year" @click="prevYearPage">Prev</button>
            <button class="next-year" @click="nextYearPage">Next</button>
            <div class="year-wrapper">
                <span v-for="(year,index) in storeYears" :key="index" @click="selectedYears(year)" class="year">
                    {{year}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DatePicker",
        props : {
          birthDate : {
              type: String,
          }
        },
        data() {
            return {
                currYear : new Date().getFullYear(),
                currMonth : new Date().getMonth(),
                months : ['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov','Dec'],
                weeks: ['S','M',"T",'W','T','F','S'],
                showDates : true,
                showMonths : false,
                showYears : false,
                maxYear : new Date().getFullYear(),
                minYear : new Date().getFullYear() - 300 + 1,
                maxMonth: new Date().getMonth(),
                maxDate : new Date().getDate(),
                showPerPage : 20,
                pages : Math.ceil(300/20),
                storeYears: [],
                disable:false,
                bd:'',
            }
        },
        methods: {
            prev() {
                this.currYear = (this.currMonth === 0) ? this.currYear - 1 : this.currYear;
                this.currMonth = (this.currMonth === 0) ? 11 : this.currMonth - 1;
            },
            next() {
                this.currYear = (this.currMonth === 11) ? this.currYear+1 : this.currYear;
                this.currMonth = (this.currMonth + 1) % 12;
            },
            getMonths() {
                this.showMonths = true;
                this.showDates = false;
                this.showYears = false;
            },
            getDates(month) {
                this.currMonth = month;
                this.showMonths = false;
                this.showDates = true;
                this.showYears = false;
            },
            getYears() {
                this.showMonths = false;
                this.showDates = false;
                this.showYears = true;
                this.fillYearArray();
            },
            selectedYears(year) {
              this.currYear = year;
              this.getMonths();
            },
            selectedDate(date) {
                this.birthDate = date + " " + this.months[this.currMonth]+","+this.currYear;
            },
            nextYearPage() {
                this.pages = this.pages === 15 ? 15 : this.pages + 1;
                this.fillYearArray();
            },
            prevYearPage() {
                this.pages = this.pages === 1 ? 1 : this.pages - 1;
                this.fillYearArray();
            },
            fillYearArray(){
                this.storeYears = [];
                for(let i = this.startYear;i<=this.endYear;i++){
                    this.storeYears.push(i);
                }
                return this.storeYears;
            },
            buttonDisabled() {
                this.disable = this.currMonth === this.maxMonth && this.currYear === this.maxYear;
                return this.disable;
            },
            monthDisabled(month) {
                return month > this.maxMonth && this.currYear === this.maxYear;
            },
            dateDisabled(date) {
                return this.buttonDisabled() && this.maxDate < date;
            },
        },
        computed: {
            numberOfDays() {
                return new Date(this.currYear,this.currMonth+1,0).getDate();
            },
            offset() {
                return new Date(this.currYear,this.currMonth).getDay()+1;
            },
            endYear() {
                return this.minYear + (this.pages * this.showPerPage) - 1;
            },
            startYear() {
                return this.minYear + (this.pages * this.showPerPage) - 20;
            },
        }
    }
</script>

<style scoped>
    .wrapper {
        z-index: 100;
        position: absolute;
        left: 0;
        top: 10px;
        width: 300px;
        height: 250px;
        padding: 20px 10px 40px 10px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 8px 12px rgba(51, 65, 80, .06), 0 14px 44px rgba(51, 65, 80, .11);
        overflow: hidden;
    }
    .prev,.next {
        position: absolute;
    }
    .prev {
        left : 10px;
    }
    .next {
        right : 10px;
    }
    .weeks {
        padding-bottom: 10px;
        font-weight: bolder;
    }
    .weeks,.dates {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
    .date,.month,.year {
        padding-bottom: 10px;
    }
    .month-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .year-wrapper {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }
    .date-header,.curr-year {
        padding: 5px;
    }
    .date-header:hover,.curr-year:hover {
        background: #E0F3F8 ;
        color: #334150;
    }
    .year-wrapper {
        padding-top: 50px;
    }
    .date,.date-header,.month,.year, .curr-year {
        cursor: pointer;
    }
    .date,.month,.year {
        vertical-align: middle;
        text-align: center;
        line-height: 30px;
        height :20px;
    }
    .date:hover,.month:hover,.year:hover {
        background: #E0F3F8 ;
    }
    .disabled {
        pointer-events: none;
        color : darkgray;
    }
</style>

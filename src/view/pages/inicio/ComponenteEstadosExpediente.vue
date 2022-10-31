<template>
<div>
    <!--begin::Advance Table Widget 2-->
    <div class="card card-custom card-stretch gutter-b">
        <!--begin::Header-->
        <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
                <span class="card-label font-weight-bolder text-dark">
                </span>
                <!--<span class="text-muted mt-3 font-weight-bold font-size-sm">
                More than 400+ new members
                </span>-->
            </h3>
        </div>
        <!--begin::Body-->
        <div class="card-body pt-3 pb-0">
        
            <div class="row">
                <div class="col-lg-12">
                    
                    <h6>Usuario</h6>
                    <div class="hori-timeline" dir="ltr">
                        <ul class="list-inline events">
                            <li class="list-inline-item event-list">
                                <div class="px-4">
                                    <div class="event-date bg-soft-primary text-white">01/08/2022</div>
                                    <h6 class="font-size-14">Peso 150kg</h6>
                                    <p class="text-muted d-none">It will be as simple as occidental in fact it will be Occidental Cambridge friend</p>
                                    <div class="d-none">
                                        <a href="#" class="btn btn-primary btn-sm">Read more</a>
                                    </div>
                                </div>
                            </li>
                            <li class="list-inline-item event-list">
                                <div class="px-4">
                                    <div class="event-date bg-soft-success text-white">01/09/2022</div>
                                    <h6 class="font-size-14">Peso 145kg</h6>
                                    <p class="text-muted d-none">Everyone realizes why a new common language one could refuse translators.</p>
                                    <div class="d-none">
                                        <a href="#" class="btn btn-primary btn-sm">Read more</a>
                                    </div>
                                </div>
                            </li>
                            <li class="list-inline-item event-list">
                                <div class="px-4">
                                    <div class="event-date bg-soft-danger text-white">01/10/2022</div>
                                    <h6 class="font-size-14">Peso 140kg</h6>
                                    <p class="text-muted d-none">If several languages coalesce the grammar of the resulting simple and regular</p>
                                    <div class="d-none">
                                        <a href="#" class="btn btn-primary btn-sm">Read more</a>
                                    </div>
                                </div>
                            </li>
                            <li class="list-inline-item event-list">
                                <div class="px-4">
                                    <div class="event-date bg-soft-warning text-white">01/11/2022</div>
                                    <h6 class="font-size-14">Peso 130kg</h6>
                                    <p class="text-muted d-none">Languages only differ in their pronunciation and their most common words.</p>
                                    <div class="d-none">
                                        <a href="#" class="btn btn-primary btn-sm">Read more</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>                
                </div>
            </div>
        </div>
    </div>
</div>


</template>


<script>
export default {
    name: "ComponenteEstadosExpediente",
    data() {
        return { 

        }
    },
    props: ['expedienteId'],
    methods: {

    },
    created(){

    }
}
</script>

<style scoped>
    .hori-timeline .events {
    border-top: 4px solid #e9ecef;
}
.hori-timeline .events .event-list {
    display: block;
    position: relative;
    text-align: center;
    padding-top: 70px;
    margin-right: 0;
}
.hori-timeline .events .event-list:before {
    content: "";
    position: absolute;
    height: 26px;
    border-right: 2px dashed #dee2e6;
    top: 15px;
}
.hori-timeline .events .event-list .event-date {
    position: absolute;
    top: 38px;
    left: 0;
    right: 0;
    width: 100px;
    margin: 0 auto;
    border-radius: 4px;
    padding: 2px 4px;
}
@media (min-width: 1140px) {
    .hori-timeline .events .event-list {
        display: inline-block;
        width: 24%;
        padding-top: 45px;
    }
    .hori-timeline .events .event-list .event-date {
        top: -14px;
    }
}
.bg-soft-primary {
    background-color: rgba(64,144,203,.9)!important;
}
.bg-soft-success {
    background-color: rgba(71,189,154,.9)!important;
}
.bg-soft-danger {
    background-color: rgba(231,76,94,.9)!important;
}
.bg-soft-warning {
    background-color: rgba(249,213,112,.9)!important;
}
.card {
    border: none;
    margin-bottom: 24px;
    -webkit-box-shadow: 0 0 13px 0 rgba(236,236,241,.44);
    box-shadow: 0 0 13px 0 rgba(236,236,241,.44);
}

</style>
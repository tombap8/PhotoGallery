// Photo Gallery 메인 JS - main.js ////

$(function () { /////// jQB ///////////////////////
    console.log("로딩완료!");

    // 이미지 설명글 셋팅하기 ///
    var msg = []; //배열변수

    // 메시지 셋팅
    for (var i = 0; i < 52; i++) {
        msg[i] = "스타화보2020-0" + (i + 1);
    } // for문 ///////////////

    //console.log(msg);



    /// 1. 포토박스에 html생성 및 초기화, 캡션글넣기
    // 대상: #gallery
    var tnum = 1; // 트랙구분 class번호
    for (var i = 0; i < 52; i++) {
        $(".t" + tnum).append(
            '<div class="photobox">' +
            '    <img src="flexImg/' + (i + 1) + '.jpg" alt="fashion">' +
            //'    <span class="cover"></span>' +
            '    <span class="txt">' + msg[i] + '</span>' +
            '</div>'
        );

        // 트랙번호 변경하기
        tnum++; //1씩증가
        if (tnum === 4) tnum = 1; //1~3까지만 반복!

    } ///// for /////////////////////////////

    /// 2. 포토박스에 마우스 오버/아웃시 변경효과주기
    // 대상: .photobox
    // hover(함수1,함수2) 사용구현
//    $(".photobox").hover(
//        function () { // over
//            //1. 반투명커버 사라지기
//            $(".cover", this)
//                .stop().fadeOut(200);
//            //2. 글자박스 올라오기
//            $(".txt", this)
//                .stop().animate({
//                    top: "70%"
//                }, 300); /// animate ////
//        },
//        function () { // out
//            //1. 반투명커버 사라지기
//            $(".cover", this)
//                .stop().fadeIn(200);
//            //2. 글자박스 올라오기
//            $(".txt", this)
//                .stop().animate({
//                    top: "100%"
//                }, 300); /// animate ////
//
//        }); //////// hover //////////////


    // 3. 포토박스 클릭시 숨겨있던 큰 이미지 배경박스
    // 와 큰 이미지 박스가 나타나보임
    // 대상: .photobox

    // 클릭된 포토박스 순번변수
    var cseq;

    $(".photobox").click(function () {

        
        // 1. 큰 이미지 배경박스 보이기
        $("#dpbg").fadeIn(300);

        // 2. 큰 이미지박스에 이미지 넣기

        // 클릭된 박스의 썸네일 이미지 경로 읽어오기
        var isrc = $("img", this).attr("src");
        
        // 0. 클릭된 포토박스 순번을 변수 cseq에 셋팅한다!
        // 용도: 이전,다음 이동시 사용함
        // 트랙당 포토박스가 들어가 있어서 일반적인 순번으로 순서를 정할 수 없다! 따라서 이미지번호를 가져온다!
        // 이미지경로를 슬래쉬로 자르고 두번째것, 또 점으로 잘라서 앞엣것
        cseq = isrc.split("/")[1].split(".")[0];
        console.log("순번:" + cseq);

        // 큰 이미지는 경로중 "/mob"만 제거하면 된다 - 경로변경 불필요!
        //isrc = isrc.replace("/mob", ""); - 주석처리!
        console.log("이미지경로:" + isrc);

        // 이미지 설명 가져오기
        var itxt = $(".txt", this).text();

        // 큰 이미지 박스에 img태그 넣기!
        $("#dpbox").html(
            '<img src="' + isrc +
            '" alt="fashion">' +
            '<h4>' + itxt + '</h4>'
        ).fadeIn(300); //서서히 보이기!
        
        var iw = $("#dpbox img").width();
        var ih = $("#dpbox img").height();
        console.log("width:"+iw+"/height:"+ih);
        
        // 가로크기 - 세로크기 의 결과가 양수이면 가로가 큰것임!
        var diff = iw - ih;
        if(diff>0){ // 가로가 크면 처리!
            $("#dpbox").css({
                height:"auto",
                width:"60vmin"
            }).find("img").css({
                height:"auto",
                width:"100%"
            });
        }///// if //////
        else{ // 세로가 크면 처리!
            $("#dpbox").css({
                width:"auto",
                height:"70vmin"
            }).find("img").css({
                width:"auto",
                height:"100%"
            });
        }//// else /////////
        
        


    }); /////// click ///////////////////

    // 4. 닫기버튼 클릭시 큰 이미지 사라지게 하기 ///
    // 대상: .cbtn
    $(".cbtn")
        .click(function (e) {
            e.preventDefault(); //기본이동막기
            // 변경대상: #dbbg, #dpbox
            $("#dpbg, #dpbox").fadeOut(300);

        }) ///////// click ////////////////
        // 마우스 오버시 버튼 회전하기 /////
        // transform:rotate(각도)는 animate가 
        // 안되므로 플러그인을 사용하여 코딩한다!
        // jquery.rotate.js 플러그인을 제이쿼리 라이브러리 아래에 넣는다!
        // 코딩시 animate({rotate:"숫자deg"}) 사용가능!
        .hover(
            function () { // over
                $(this).stop().animate({
                    rotate: "-90deg"
                }, 200); /// animate /////
            },
            function () { // out
                $(this).stop().animate({
                    rotate: "0deg"
                }, 200); /// animate /////
            }); //////// hover //////////////


    /// 5. 이동버튼 클릭시 큰 이미지 변경하기 /////
    // 이동방법: 전역변수를 하나 만들고 클릭한 .photobox의 순번을 
    // 가져와서 전역변수에 담고 오른쪽 버튼 클릭시 1씩 증가
    // 왼쪽버튼 클릭시 1씩 감소하여 이미지를 전환한다!


    // 포토박스 개수 미리 계산하기!(한계값 체크시 사용!)
    var pcnt = $(".photobox").length;
    console.log("포토박스개수:" + pcnt);

    // 대상: .abtn
    $(".abtn").click(function (e) {
        e.preventDefault(); //기본이동막기
        // 버튼 구분하기 //

        // is() 메서드 소개~~!!!
        // - 선택요소의 속성 중 특정 값이 있는지 여부를 구분하여 true/false리턴
        
        console.log("변경전 순번:" + cseq);

        // 1. 오른쪽 버튼
        if ($(this).is(".rb")) {
            //console.log("오른쪽여부:"+$(this).is(".rb"));

            // 전역변수 순번 증가!
            cseq++;

            // 한계값 설정(이미지번호 1번으로 가라!)
            if (cseq > pcnt) cseq = 1; //처음으로!

        } //// if ///////////////

        // 2. 왼쪽 버튼
        else {

            // 전역변수 순번 감소!
            cseq--;

            // 한계값 설정
            //(첫번째 이미지 번호 1보다 작으면 마지막 번호로감)
            if (cseq < 1) cseq = pcnt;


        } /// else //////////////////

        console.log("변경된 순번:" + cseq);

        // 3. 큰 이미지 박스의 src 변경하기
        // -> 이미지번호는 그대로 사용한다!(이미지번호에서 가져왔으므로)
        // 대상: #dpbox img
        $("#dpbox img").attr("src", "flexImg/" + cseq + ".jpg");

        // 4. 큰 이미지 설명글 변경하기
        // -> 메시지 배열변수의 셋팅값을 가져온다!
        // 이미지번호를 가져왔으므로 배열순번은 1을 뺀다!
        // 대상: #dpbox h4
        $("#dpbox h4").text(msg[cseq-1]);
        
        
        var iw = $("#dpbox img").width();
        var ih = $("#dpbox img").height();
        console.log("width:"+iw+"/height:"+ih);
        
        // 가로크기 - 세로크기 의 결과가 양수이면 가로가 큰것임!
        var diff = iw - ih;
        if(diff>0){ // 가로가 크면 처리!
            $("#dpbox").css({
                height:"auto",
                width:"60vmin"
            }).find("img").css({
                height:"auto",
                width:"100%"
            });
        }///// if //////
        else{ // 세로가 크면 처리!
            $("#dpbox").css({
                width:"auto",
                height:"70vmin"
            }).find("img").css({
                width:"auto",
                height:"100%"
            });
        }//// else /////////
        

    }); //////////// click //////////////////








}); ////////// jQB ///////////////////////////////
/////////////////////////////////////////////////

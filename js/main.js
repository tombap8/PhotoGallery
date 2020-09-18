// Photo Gallery 메인 JS - main.js ////

$(function () { /////// jQB ///////////////////////
    console.log("로딩완료!");

    // 이미지 설명글 셋팅하기 ///
    var msg = [
        "고귀하고 엘레강스한 여자",
        "시크하고 도도한 여자",
        "여신같고 신비로운 여자",
        "환상속에 꿈을 꾸는 여자",
        "고풍스런 미를 지닌 여자"
    ];


    /// 1. 포토박스에 html생성 및 초기화, 캡션글넣기
    // 대상: #gallery
    for (var i = 0; i < 5; i++) {
        $("#gallery").append(
            '<div class="photobox">' +
            '    <img src="images/mob/' + (i + 1) + '.jpg" alt="fashion">' +
            '    <span class="cover"></span>' +
            '    <span class="txt">' + msg[i] + '</span>' +
            '</div>'
        );
    } ///// for /////////////////////////////

    /// 2. 포토박스에 마우스 오버/아웃시 변경효과주기
    // 대상: .photobox
    // hover(함수1,함수2) 사용구현
    $(".photobox").hover(
        function () { // over
            //1. 반투명커버 사라지기
            $(".cover", this)
                .stop().fadeOut(200);
            //2. 글자박스 올라오기
            $(".txt", this)
                .stop().animate({
                    top: "70%"
                }, 300); /// animate ////
        },
        function () { // out
            //1. 반투명커버 사라지기
            $(".cover", this)
                .stop().fadeIn(200);
            //2. 글자박스 올라오기
            $(".txt", this)
                .stop().animate({
                    top: "100%"
                }, 300); /// animate ////

        }); //////// hover //////////////


    // 3. 포토박스 클릭시 숨겨있던 큰 이미지 배경박스
    // 와 큰 이미지 박스가 나타나보임
    // 대상: .photobox

    // 클릭된 포토박스 순번변수
    var cseq;

    $(".photobox").click(function () {

        // 0. 클릭된 포토박스 순번을 변수 cseq에 셋팅한다!
        // 용도: 이전,다음 이동시 사용함
        cseq = $(this).index();
        console.log("순번:" + cseq);

        // 1. 큰 이미지 배경박스 보이기
        $("#dpbg").fadeIn(300);

        // 2. 큰 이미지박스에 이미지 넣기

        // 클릭된 박스의 썸네일 이미지 경로 읽어오기
        var isrc = $("img", this).attr("src");

        // 큰 이미지는 경로중 "/mob"만 제거하면 된다
        isrc = isrc.replace("/mob", "");
        console.log("이미지경로:" + isrc);

        // 이미지 설명 가져오기
        var itxt = $(".txt", this).text();

        // 큰 이미지 박스에 img태그 넣기!
        $("#dpbox").html(
            '<img src="' + isrc +
            '" alt="fashion">' +
            '<h4>' + itxt + '</h4>'
        ).fadeIn(300); //서서히 보이기!


    }); /////// click ///////////////////


    // 4. 닫기버튼 클릭시 큰 이미지 사라지게 하기 ///
    // 대상: .cbtn
    $(".cbtn")
        .click(function () {
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
    $(".abtn").click(function () {
        // 버튼 구분하기 //

        // is() 메서드 소개~~!!!
        // - 선택요소의 속성 중 특정 값이 있는지 여부를 구분하여 true/false리턴

        // 1. 오른쪽 버튼
        if ($(this).is(".rb")) {
            //console.log("오른쪽여부:"+$(this).is(".rb"));

            // 전역변수 순번 증가!
            cseq++;

            // 한계값 설정(개수-1은 마지막 순번임)
            if (cseq > pcnt - 1) cseq = 0; //처음으로!

        } //// if ///////////////

        // 2. 왼쪽 버튼
        else {

            // 전역변수 순번 감소!
            cseq--;

            // 한계값 설정(첫번째 보다 작으면 마지막 번호로 감)
            if (cseq < 0) cseq = pcnt - 1;


        } /// else //////////////////

        console.log("변경된 순번:" + cseq);

        // 3. 큰 이미지 박스의 src 변경하기
        // -> 이미지번호는 순번보다 1크다!
        // 대상: #dpbox img
        $("#dpbox img").attr("src", "images/" + (cseq + 1) + ".jpg");

        // 4. 큰 이미지 설명글 변경하기
        // -> 메시지 배열변수의 셋팅값을 가져온다!
        // 대상: #dpbox h4
        $("#dpbox h4").text(msg[cseq]);

    }); //////////// click //////////////////








}); ////////// jQB ///////////////////////////////
/////////////////////////////////////////////////

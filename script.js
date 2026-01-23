$(function(){

    // --- ドロップダウンメニュー ---
    $("ul.main-menu li").hover(function(){
        $(">ul:not(:animated)", this).slideDown("fast");
    },
    function(){
        $(">ul", this).slideUp("fast");
    });

    // --- レスポンシブ対応スライダー ---
    var currentSlide = 0;
    var $slides = $(".slide");
    var totalSlides = $slides.length;
    var $sliderWrapper = $(".slider-wrapper");

    // 次へ動かす関数
    function nextSlide() {
        currentSlide++;
        if(currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        updateSlider();
    }

    // 前へ動かす関数
    function prevSlide() {
        currentSlide--;
        if(currentSlide < 0) {
            currentSlide = totalSlides - 1;
        }
        updateSlider();
    }

    // スライダーの位置を更新する関数（%で動かす）
    function updateSlider() {
        var movePercent = -(currentSlide * 100); // -100%, -200%...
        $sliderWrapper.stop().animate({
            left: movePercent + "%"
        }, 600);
    }

    // 自動スライド（3秒ごと）
    var autoTimer = setInterval(nextSlide, 2500);

    // 矢印ボタンクリックイベント
    $(".next-btn").click(function(){
        clearInterval(autoTimer);
        nextSlide();
        autoTimer = setInterval(nextSlide, 3000);
        return false;
    });

    $(".prev-btn").click(function(){
        clearInterval(autoTimer);
        prevSlide();
        autoTimer = setInterval(nextSlide, 3000);
        return false;
    });

    // --- モーダルウィンドウ ---
    $(".slide, .work-item").click(function(){
        // データを取得
        var imgSrc = $(this).find("img").attr("src");
        var title = $(this).attr("title");
        var desc = $(this).attr("data-desc");
        var url = $(this).attr("data-url");

        // モーダルの中身をセット
        $("#modal-img").attr("src", imgSrc);
        $("#modal-title").text(title);
        $("#modal-desc").text(desc);
        

        if (url == "" || url == "#"){
            $("#modal-link").hide();
        }

        else{
            $("modal-link").show();
            $("#modal-link").attr("href", url);
        }


        // レイアウト崩れを防ぐためflexクラスを付与して表示
        $("#modal-content").addClass("modal-flex").fadeIn("slow");
        $("#modal-overlay").fadeIn("slow");
    });

    // 閉じる処理
    $("#modal-close, #modal-overlay").click(function(){
        $("#modal-content, #modal-overlay").fadeOut("slow", function(){
            // 完全に消えたらflexクラスを外す（念のため）
            $("#modal-content").removeClass("modal-flex");
        });
        return false;
    });

});

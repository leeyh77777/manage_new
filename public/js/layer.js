/**
 * 레이어 팝업
 *
 */
const layer = {
  /** 팝업 열기 */
  open: function (url, width, height) {
    width = width || 300;
    height = height || 300;

    if ($("#layer_dim").length == 0) {
      // 레이어 팝업 백그라운드 요소가 존재하지 않으면 -> 추가
      $("body").append("<div id='layer_dim'></div>");
    }

    if ($("#layer_popup").length == 0) {
      // 레이어 팝업이 존재하지 않으면 -> 추가
      $("body").append("<div id='layer_popup'></div>");
    }

    $("#layer_dim").css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 100,
    });

    const left = Math.round(($(window).width() - width) / 2);
    const top = Math.round(($(window).height() - height) / 2);

    const html = `
							<i class='xi-close-thin' id='layer_close'></i>
                            <div id="layer_desc">
                            <dl>
                            <dt>제목</dt>
                            <dd>
                                <input type="text" name="title" class="title">
                            </dd>
                        </dl>
                        <dl>
                            <dt>내용</dt>
                            <dd>
                                <input type="text" name="desc" class="desc">
                            </dd>
                        </dl>
                        <input type="submit" value="저장" class="button">
                        </div>
							<!-- <iframe src='${url}' width='${width}' height='${height}' frameborder='0'></iframe> -->
						`;

    $("#layer_desc > input").css({
      padding: "0",
      
    });

    $("#layer_popup")
      .css({
        position: "fixed",
        top: "30vmin",
        left: "15vmin",
        width: "70vmin",
        height: "60vmin",
        backgroundColor: "#ffffff",
        zIndex: 101,
        borderRadius: "10px",
      })
      .html(html);

    $("#layer_close").css({
      position: "absolute",
      fontSize: "2.5rem",
      color: "#ffffff",
      top: "-38px",
      right: "-38px",
      cursor: "pointer",
    });
  },
  /** 팝업 닫기 */
  close: function () {
    $("#layer_dim, #layer_popup").remove();
  },
};

$(function () {
  $("body").on("click", "#layer_dim, #layer_close", function () {
    layer.close();
  });
});

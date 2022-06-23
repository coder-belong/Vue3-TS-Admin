import $ from "jquery";

// 设置动画初始化
function init() {
	// 顶部数量展示区域
	$(".goods-amount").css({
		transform: "scale(0)",
		opacity: "0"
	});

	// 中间3个饼图图表
	$(".center-chart-item").css({
		transform: "scale(0)",
		opacity: "0"
	});

	// 底部折线图和柱状图区域
	$(".bottom-chart").css({
		transform: "translateX(-100%)",
		opacity: "0"
	});

	// 延迟测试入场动画
	setTimeout(() => {
		// 顶部数量展示区域
		$(".goods-amount").css({
			transform: "scale(1)",
			transition: "all 1s",
			opacity: "1"
		});

		// 中间3个饼图图表
		$(".center-chart-item").css({
			transform: "scale(1)",
			transition: "all 1s 1s",
			opacity: "1"
		});

		// 底部折线图和柱状图区域
		$(".bottom-chart").css({
			transform: "translateX(0%)",
			transition: "all 1s 2s",
			opacity: "1"
		});
	}, 100);
}


function amountScrollAnimation() {
	let contentTop = $(".page-content").scrollTop();
	let amountTop = $(".goods-amount").offset().top;
	let amountHeight = $(".goods-amount").height();

	if (amountHeight / 2 < -amountTop) {
		$(".goods-amount").css({
			transform: "scale(0)",
			opacity: "0"
		});
	} else {
		$(".goods-amount").css({
			transform: "scale(1)",
			transition: "all 1s",
			opacity: "1"
		});
	}
}

function centerChartScrollAnimation() {
	let contentTop = $(".page-content").scrollTop();
	let eleTop = $(".center-chart-item").offset().top;
	let height = $(".center-chart-item").height();

	if (height / 2 < -eleTop) {
		$(".center-chart-item").css({
			transform: "scale(0)",
			opacity: "0"
		});
	} else {
		$(".center-chart-item").css({
			transform: "scale(1)",
			transition: "all 1s",
			opacity: "1"
		});
	}
}

function bottomChartScrollAnimation() {
	let contentTop = $(".page-content").scrollTop();
	let eleTop = $(".bottom-chart").offset().top;
	let height = $(".bottom-chart").height();

	if (contentTop > eleTop) {
		$(".bottom-chart").css({
			transform: "translateX(0%)",
			transition: "all 1s",
			opacity: "1"
		});
	} else {
		$(".bottom-chart").css({
			transform: "translateX(-100%)",
			opacity: "0"
		});
	}
}


export {
	init,
	amountScrollAnimation,
	centerChartScrollAnimation,
	bottomChartScrollAnimation
};

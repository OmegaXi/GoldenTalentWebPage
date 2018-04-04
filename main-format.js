function sendReservationEmail() {
    var reservation = getReservation();
    if(!reservation.name) return alert('请输入您的姓名，以便与您进一步联系。');
    if(!reservation.field) return alert('请选择贵司所属行业，以便与您进一步联系。');
    if(!reservation.company) return alert('请输入贵司名称，以便与您进一步联系。');
    if(!reservation.email) return alert('请输入您的邮箱地址，以便与您进一步联系。');
    if(!reservation.phone) return alert('请输入您的联系电话，以便与您进一步联系。');
    $('#modal_reservation').modal('hide');
    $.post('/sendEmailForDemoAppointment',
        reservation,
        function (data) {
            if(!!data && !!data.success) {
                alert('发送成功，我们将尽快与您联系，期待您的来访。');
                clearReservation();
            } else {
                alert('网络不太好，您可以再次尝试提交，或直接通过页面底部邮箱及电话与我们联系。');
            }
        });
}
function getReservation() {
    var product = [];
    $('[ name="reservation_product"]').each(function () {
        if($(this).get(0).checked) {
            product.push($(this).val());
        }
    })
    return {
        name: $('#reservation_name').val(),
        field: $('#reservation_field').val(),
        company: $('#reservation_company').val(),
        email: $('#reservation_email').val(),
        phone: $('#reservation_phone').val(),
        product: product
    };
}
function clearReservation() {
    $('[ name="reservation_product"]').attr('checked', false);
    $('#reservation_name').val('');
    $('#reservation_field').val('');
    $('#reservation_company').val('');
    $('#reservation_email').val('');
    $('#reservation_phone').val('');
}

function formatHeader() {
    $('body').prepend(
        $('\
        <div id="box_header" style="position: absolute; top: 0; width: 100%; height: 50px; z-index: 2;">\
            <div class="container" style="background: rgba(0,0,0,0.6);">\
                <div id="header_area" class="row">\
                    <div class="col-lg-12 col-md-12 col-sm-12">\
                        <div class="row">\
                            <div class="col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-lg-1 col-md-1 col-sm-1 img-col">\
                                <div class="header-area-logo-div"><span><img src="./images/gold_telent_logo_200w.png" alt="Gold Talent 亮才" /></sapn></div>\
                            </div>\
                            <div class="col-lg-7 col-md-7 col-sm-7">\
                                <a href="index.html"><div class="header-btn-main">首页</div></a>\
                                <a href="wms.html"><div class="header-btn-main">WMS</div></a>\
                                <a href="tms.html"><div class="header-btn-main">TMS</div></a>\
                                <a href="weika.html"><div class="header-btn-main">微卡</div></a>\
                                <a href="controlTower.html"><div class="header-btn-main">控制塔</div></a>\
                                <a href="blog.html"><div class="header-btn-main">博客</div></a>\
                                <a href="aboutus.html"><div class="header-btn-main">关于我们</div></a>\
                                <a data-toggle="modal" data-target="#modal_reservation"><div class="header-btn-main">免费试用</div></a>\
                            </div>\
                            <div class="col-lg-2 col-md-2 col-sm-2">\
                                <a href="signin" target="_blank"><div class="header-btn-side">微卡登陆</div></a>\
                                <a href="http://tms.weikayun.com" target="_blank"><div class="header-btn-side">TMS登陆</div></a>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <!-- 模态框（Modal） -->\
        <div class="modal fade" id="modal_reservation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\
                            &times;\
                        </button>\
                        <h4 class="modal-title" id="myModalLabel">\
                            免费产品试用\
                        </h4>\
                    </div>\
                    <div class="modal-body">\
                        <label class="control-label">免费产品试用与演示，亲身体验亮才产品的强大和灵活</label>\
                        <div class="row">\
                            <div class="col-sm-6"><div class="row">\
                                <div class="col-sm-4"><label for="reservation_name" class="control-label reservation-title"><span>*</span>姓名</label></div>\
                                <div class="col-sm-8"><input type="text" class="form-control" id="reservation_name"></div>\
                            </div></div>\
                            <div class="col-sm-6"><div class="row">\
                                <div class="col-sm-4"><label for="reservation_field" class="control-label reservation-title"><span>*</span>行业</label></div>\
                                <div class="col-sm-8"><select type="text" class="form-control" id="reservation_field">\
                                    <option>货主企业</option>\
                                    <option>三方物流</option>\
                                    <option>零担专线</option>\
                                    <option>其他</option>\
                                </select></div>\
                            </div></div>\
                        </div>\
                        <div class="row">\
                            <div class="col-sm-2"><label for="reservation_company" class="control-label reservation-title"><span>*</span>公司名称</label></div>\
                            <div class="col-sm-10"><input type="text" class="form-control" id="reservation_company"></div>\
                        </div>\
                        <div class="row">\
                            <div class="col-sm-2"><label for="reservation_email" class="control-label reservation-title"><span>*</span>邮箱</label></div>\
                            <div class="col-sm-10"><input type="text" class="form-control" id="reservation_email"></div>\
                        </div>\
                        <div class="row">\
                            <div class="col-sm-2"><label for="reservation_phone" class="control-label reservation-title"><span>*</span>手机号</label></div>\
                            <div class="col-sm-10"><input type="text" class="form-control" id="reservation_phone"></div>\
                        </div>\
                        <div class="row"><div class="col-sm-12"><label>您感兴趣的产品</label></div></div>\
                        <div class="row">\
                            <div class="col-sm-3"><label class="checkbox-inline">\
                                <input type="checkbox" name="reservation_product" id="reservation_product1" value="wms"> WMS\
                            </label></div>\
                            <div class="col-sm-3"><label class="checkbox-inline">\
                                <input type="checkbox" name="reservation_product" id="reservation_product2" value="tms"> TMS\
                            </label></div>\
                            <div class="col-sm-3"><label class="checkbox-inline">\
                                <input type="checkbox" name="reservation_product" id="reservation_product3" value="weika"> 微卡\
                            </label></div>\
                            <div class="col-sm-3"><label class="checkbox-inline">\
                                <input type="checkbox" name="reservation_product" id="reservation_product4" value="ct"> 控制塔\
                            </label></div>\
                        </div>\
                    </div>\
                    <div class="modal-footer">\
                        <a><div class="button" onclick="sendReservationEmail();">立即提交</div></a>\
                    </div>\
                </div>\
            </div>\
        </div>')
    )
}

function formatFooter() {
    $('#contact_area').html('\
        <div class="col-lg-12 col-md-12 col-sm-12">\
            <div class="row">\
                <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-lg-8 col-md-8 col-sm-8">\
                    <div class="row">\
                        <div class="col-lg-10 col-md-10 col-sm-10 contact-body-table">\
                            <h3>联系我们</h3>\
                            <table>\
                                <tr>\
                                    <td>sales@weikayun.com</td>\
                                    <td style="font-size: 16px;">中国·上海瑞丰大厦 杨树浦路 248号 3楼</td>\
                                </tr>\
                                <tr>\
                                    <td>support@weikayun.com</td>\
                                    <td>021-23018110</td>\
                                </tr>\
                            </table>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <div class="row">\
                <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-lg-8 col-md-8 col-sm-8 contact-body-copyright">\
                    <p>Copyright @ 2017 <a href="http://www.miitbeian.gov.cn" target="_blank">沪ICP备15003222号</a></p>\
                </div>\
            </div>\
        </div>')
}

$(document).ready(function(){
    formatHeader();
    formatFooter();
});

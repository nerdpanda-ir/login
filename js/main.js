
window.addEventListener('load',function () {
    var getActiveBtn,getSlideActive;


     getActiveBtn = window.document.body.querySelector(".activeBtn");
     getSlideActive = window.document.querySelector("[data-contentName='"+getActiveBtn.getAttribute('data-BtnName')+"']");

    var getSlideButtons = window.document.body.querySelectorAll(".slideSelector");
    var getContentSlids = window.document.body.querySelectorAll(".contentSlide");
    var allWidth =window.Number(getComputedStyle(window.document.body.querySelector(".slideHeader"),null).width.replace('px',''));

    if(getSlideButtons.length==getContentSlids.length)
    {
        var process = allWidth / getSlideButtons.length;
        for(var indexButtons = 0 ; indexButtons<getSlideButtons.length;indexButtons++)
        {
            getSlideButtons[indexButtons].style.width = (process)+"px";
            if (getSlideButtons[indexButtons].classList.contains('activeBtn')==false)
            {
                var moreContents  = window.document.body.querySelector('[data-contentName='+'\''+ getSlideButtons[indexButtons].getAttribute('data-BtnName')+'\']');
                moreContents.classList.add('disNone');
            }
            getSlideButtons[indexButtons].addEventListener('click',function () {
               if(this.classList.contains('activeBtn')==false)
               {
                   getSlideActive.style.display="none";
                   getActiveBtn.classList.remove('activeBtn');
                   this.classList.add('activeBtn');
                   getActiveBtn = window.document.body.querySelector(".activeBtn");
                   getSlideActive = window.document.querySelector("[data-contentName='"+getActiveBtn.getAttribute('data-BtnName')+"']");
                   getSlideActive.style.display="block";

               }

            })
        }
    }
    
})
window.addEventListener('load',function () {
    var userNameForm = window.document.body.querySelector("#userName");
    var passwordForm = window.document.body.querySelector("#password");
    var loginBtn = window.document.body.querySelector("#LoginBtn");
    var resetBtn = window.document.body.querySelector("#clearBtn");
    var userNameRgx = new RegExp("^\\b(\[a-zA-Z]+[._]?(\\w+)?)\\b$","igm");
    var passwordRgx = new RegExp("^\\b(\\w{8,30})\\b$","igm")
    var userNameLengthCheck = false;
    var passwordLengthCheck = false;
    var userNameRegexCheck = false;
    var passwordRegexCheck = false;
    function submitDisableBtn() {
        if (loginBtn.hasAttribute('disabled') == false)
        {
            var disabledAttr = window.document.createAttribute('disabled');
            disabledAttr.value = 'disabled';
            loginBtn.setAttributeNode(disabledAttr);
        }
    }
    function submitEnableBtn() {
        if (loginBtn.hasAttribute('disabled') == true)
        {
            loginBtn.removeAttribute('disabled')
        }
    }
    function resetDisableBtn() {
        if (resetBtn.hasAttribute('disabled') == false)
        {
            var disabledAttr = window.document.createAttribute('disabled');
            disabledAttr.value = 'disabled';
            resetBtn.setAttributeNode(disabledAttr);
        }
    }
    function enableResetBtn() {
        if (resetBtn.hasAttribute('disabled') == true)
        {
            resetBtn.removeAttribute('disabled')
        }
    }
    function checkLengthForm(val) {
        var flag = false;

        if(val.length==0)
        {
            flag = false;
        }
        else if(val.length>0)
        {
            enableResetBtn();
            flag = true;
        }
        return flag;
    }
    function checkRgxForm(val,rgx) {
        var flag = false;
        if(val.match(rgx) !=null)
        {
            flag = true;
        }
        else
            flag= false;

        return flag;
    }
    checkLengthForm(userNameForm.value)
    resetDisableBtn();
    userNameForm.addEventListener('keyup',function () {
        userNameLengthCheck =  checkLengthForm(this.value);
        userNameRegexCheck = checkRgxForm(this.value,userNameRgx)
        if(userNameRegexCheck==false)
        {
            if(this.classList.contains('formError')==false)
            {
                this.classList.add('formError');

            }
            if(this.classList.contains('formSucsess')==true)
            {
                this.classList.remove('formSucsess');
            }
        }
        else if(userNameRegexCheck==true)
        {
            if(this.classList.contains('formError')==true)
            {
                this.classList.remove('formError');
            }
            if(this.classList.contains('formSucsess')==false)
            {
                this.classList.add('formSucsess');
            }
        }
        window.document.querySelector("#test").innerText = userNameRegexCheck;
    })
    passwordForm.addEventListener('keyup',function () {
        passwordLengthCheck = checkLengthForm(this.value);
        //alert(passwordLengthCheck)
        passwordRegexCheck = checkRgxForm(this.value,passwordRgx)
        if(passwordRegexCheck==false)
        {
            if(this.classList.contains('formError')==false)
            {
                this.classList.add('formError');


            }
            if(this.classList.contains('formSucsess')==true)
            {
                this.classList.remove('formSucsess');
            }
        }
        else if(passwordRegexCheck==true)
        {
            if(this.classList.contains('formError')==true)
            {
                this.classList.remove('formError');
            }
            if(this.classList.contains('formSucsess')==false)
            {
                this.classList.add('formSucsess');
            }
        }
    })
    resetBtn.addEventListener('click',function () {
        userNameForm.value = "";
        passwordForm.value ="";
        userNameLengthCheck = false;
        passwordLengthCheck = false;
        passwordRegexCheck = false;
        userNameRegexCheck = false;

        resetDisableBtn();
    })
    setInterval(function () {
        if((userNameLengthCheck == true && passwordLengthCheck==true)  && userNameRegexCheck==true && passwordRegexCheck==true)
        {
            submitEnableBtn()
        }
        else submitDisableBtn();
        if(userNameForm.value.length == 0 && passwordForm.value.length==0)
            resetDisableBtn();

    })
    function loginAjaxCheck(userName,password,callback) {
        if(userName !=undefined && typeof userName =="string" && password!=undefined && typeof password=="string")
        {
            window.document.body.querySelector("#waiting").style.display = "block";
            var value ;

            var ajx = ((window.XMLHttpRequest) ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
            ajx.open("POST","login.php",true);
            ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajx.send("userId="+userName+"& userPassword="+password);
            ajx.addEventListener('readystatechange',function () {
                if(ajx.readyState==4 && ajx.status==200)
                {
                    value = ajx.responseText

                    if(window.Boolean(value)==true)
                    {
                        value = window.JSON.parse(value);
                        window.document.body.querySelector("#waiting").style.display = "none";

                        callback(value);
                    }
                }
            })
        }
    }
    loginBtn.addEventListener('click',function (eventHandle) {
        eventHandle.preventDefault();
        loginAjaxCheck(userNameForm.value,passwordForm.value,function (getResult) {

            /*------- remove body children tags -----*/
                for(var i = 0 ; i<window.document.body.childElementCount;i++)
                {
                    if(window.document.body.children[i].tagName!="IMG")
                    {
                        window.document.body.removeChild(window.document.body.children[i]);
                    }
                    else
                    {
                        window.document.body.children[i].src =getResult.avatar

                    }
                }
            /*------- remove body children tags -----*/
               var topNav = window.document.createElement("div");
                topNav.id="topNav";
                topNav.innerText = "خوش آمدید " + getResult.u_Fname;
                window.document.body.appendChild(topNav)
        })
    })
})

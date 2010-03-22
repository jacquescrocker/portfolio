var currentPanel="none";

$(document).ready(function(){   
               
  // Initializes FancyBox Lightbox
  $("a.sliderImage").fancybox({
    'zoomSpeedIn':200, 
    'zoomSpeedOut':200, 
    'overlayShow':true,
    'padding':4
  });
  
  SelectButton("none");
  $("#arrow").fadeOut(0);
  
  if (navigator.appVersion.indexOf("MSIE 7.0")!=-1){
    $("input").css({"height":13});
    $("#name").css({"width":155});
  };
  
  $("#title").click(function(){
    ShowPanel("none");
  });
               
  // setup porfolio slider
  var imageWrapper = $("#imageWrapper");
  imageWrapper.bind({
    "init": function() {
      var self = $(this);

      // find how many images there are
      self.data("total", self.find("#imgList").children().length)

      // initialize current to 1
      self.data("current", 1);

      // set overall width
      imageWrapper.css({"width":(self.data("total")*541)});
      
      // set description
      self.trigger("setDescription");        
    },
    
    "previous": function() {
      var self = $(this);
      
      // decrement index
      var currentIndex = self.data("current");
      if (currentIndex==1){
        currentIndex = self.data("total");
      } else {
        currentIndex--;
      };
      self.data("current", currentIndex);
      
      self.trigger("animate");
      self.trigger("setDescription");
    },
    
    "next": function() {
      var self = $(this);
      
      // increment index
      var currentIndex = self.data("current");
      if (currentIndex == self.data("total")){
        currentIndex = 1;
      } else {
        currentIndex++;
      };
      self.data("current", currentIndex);
      
      self.trigger("animate");
      self.trigger("setDescription");
    },
    
    "animate": function(e) {
      var self = $(this);
      self.animate({"left":-((self.data("current")-1)*541)},500);
    },
    
    "setDescription": function() {
      var self = $(this);
      var currentDescription = self.find(".description").eq(self.data("current")-1);
      
      var portfolioDescription = $("#portfolioDescription")
      if(currentDescription.length > 0) {
        portfolioDescription.html(currentDescription.html());
        portfolioDescription.show();
      }
      else {
        portfolioDescription.hide();
      }
      
    }
  });
  imageWrapper.trigger("init");  
  
  // Handles Function of the Portfolio Slider
  $("#prevButton").click(function(){
    imageWrapper.trigger("previous");
  });
  
  $("#nextButton").click(function(){
    imageWrapper.trigger("next");
  });
    
  // Handles Rollover and Click For the Nav Buttons
  $("#aboutButton").mouseenter(function(){
    SelectButton("about");
  });
  $("#portfolioButton").mouseenter(function(){
    SelectButton("portfolio");
  });
  $("#servicesButton").mouseenter(function(){
    SelectButton("services");
  });
  $("#contactButton").mouseenter(function(){
    SelectButton("contact");
  });
  $("#aboutButton,#portfolioButton,#servicesButton,#contactButton").mouseleave(function(){
    SelectButton("none");
  });

  $("#aboutButton").click(function(){
    ShowPanel("about");                
  });

  $("#portfolioButton").click(function(){
    ShowPanel("portfolio");                
  });

  $("#servicesButton").click(function(){
    ShowPanel("services");                 
  });

  $("#contactButton").click(function(){
    ShowPanel("contact");                
  });
  
  // Handles Contact Form Behavior  
  $("#name").focus(function(){
    $("#name").css({"background-color":"#FFFFFF"});
    if ($("#name").val()=="name"){
      $("#name").val("");
      $("#name").css({"color":"#444444"});
    };
  });
  $("#name").blur(function(){
    if ($("#name").val()==""){
      $("#name").val("name");
      $("#name").css({"color":"#888888"});
      $("#name").css({"background-color":"#ffdddd"});
    };
  });
  $("#email").focus(function(){
    $("#email").css({"background-color":"#FFFFFF"});
    if ($("#email").val()=="email"){
      $("#email").val("");
      $("#email").css({"color":"#444444"});
    };
  });
  $("#email").blur(function(){
    if ($("#email").val()==""){
      $("#email").val("email");
      $("#email").css({"color":"#888888"});
      $("#email").css({"background-color":"#ffdddd"});
    };
    if ($("#email").val().indexOf("@")==-1 || $("#email").val().indexOf(".")==-1){
      $("#email").css({"background-color":"#ffdddd"});
    };
  });
  $("#message").focus(function(){
    $("#message").css({"background-color":"#FFFFFF"});
    if ($("#message").val()=="message"){
      $("#message").val("");
      $("#message").css({"color":"#444444"});
    };
  });
  $("#message").blur(function(){
    if ($("#message").val()==""){
      $("#message").val("message");
      $("#message").css({"color":"#888888"});
      $("#message").css({"background-color":"#ffdddd"});
    };
  });
  $("#submit").mousedown(function(){
    $("#submit").attr({"src":"images/sendButtonSel.png"});
  });
  $("#submit").mouseup(function(){
    $("#submit").attr({"src":"images/sendButton.png"}); 
  });
  $("#submit").mouseout(function(){
    $("#submit").attr({"src":"images/sendButton.png"});               
  });
  $("#name,#email,#message").keyup(function(){
    if ($("#name").val()!="" && $("#name").val()!="name" && $("#email").val()!="" && $("#email").val()!="email" && $("#email").val().indexOf("@")>-1 && $("#email").val().indexOf(".")>-1 && $("#message").val()!="" && $("#message").val()!="message"){
      EnableSubmitButton();
    } else {
      DisableSubmitButton();
    };
  });
  $("#submit").click(function(){
    DisableSubmitButton();
    var dataString="name=" + $("#name").val() + "&email=" + $("#email").val() + "&message=" + $("#message").val();
    $.ajax({  
      type: "POST",  
      url: "mail.php",  
      data: dataString,  
      success: function() {  
        ResetForm();
        $("#successMessage").fadeIn(10);
        setTimeout('$("#successMessage").fadeOut(1000);',2000);
      }
    });
    return false; 
  });

});

function EnableSubmitButton(){
  $("#submit").attr({"disabled":""});
  $("#submit").attr({"src":"images/sendButton.png"});
};

function DisableSubmitButton(){
  $("#submit").attr({"disabled":"disabled"});
  $("#submit").attr({"src":"images/sendButtonDis.png"});
};

function ResetForm(){
  DisableSubmitButton();
  $("#name, #email, #message").css({"background-color":"#FFFFFF"});
  $("#name, #email, #message").css({"color":"#888888"});
  $("#name").val("name");
  $("#email").val("email");
  $("#message").val("message");
};

function ShowPanel(panel){
  if(currentPanel == panel) {
    return;
  }

  currentPanel = panel;
  SelectButton(panel);
  $(".content").fadeOut(250);
    switch(panel){
      case "none":
        $("#contentPanelWrapper").animate({"left":"100%"},500);
        $("#arrow").fadeOut(50)
      break;
      case "portfolio":
        $("#contentPanelWrapper").animate({"left":"100%"},500,function(){
          $("#portfolioContent").show();
          $("#contentPanelWrapper").animate({"left":"44%"},500);
        });
        $("#arrow").animate({"top":22},150,function(){$("#arrow").fadeIn(50)});
      break;
      case "about":
        $("#contentPanelWrapper").animate({"left":"100%"},500,function(){
          $("#aboutContent").show();
          $("#contentPanelWrapper").animate({"left":"44%"},500);
        });
        $("#arrow").animate({"top":98},150,function(){$("#arrow").fadeIn(50)});
      break;
      case "services":
        $("#contentPanelWrapper").animate({"left":"100%"},500,function(){
          $("#servicesContent").show();
          $("#contentPanelWrapper").animate({"left":"44%"},500);
        });
        $("#arrow").animate({"top":170},150,function(){$("#arrow").fadeIn(50)});
      break;
      case "contact":
        $("#contentPanelWrapper").animate({"left":"100%"},500,function(){
          $("#contactContent").show();
          $("#contentPanelWrapper").animate({"left":"44%"},500);
        });
        $("#arrow").animate({"top":243},150,function(){$("#arrow").fadeIn(50)});
      break;
    };
};

function SelectButton(button){
  if (currentPanel!="about"){
    $("#aboutCaption").animate({"left":50},{queue:false, duration:250});
    $("#aboutCaption").animate({"opacity":0},{queue:false, duration:250});
    $("#aboutButton").css({"background-position":"0px 0px"});
  };
  if (currentPanel!="portfolio"){
    $("#portfolioCaption").animate({"left":50},{queue:false, duration:250});
    $("#portfolioCaption").animate({"opacity":0},{queue:false, duration:250});
    $("#portfolioButton").css({"background-position":"0px -64px"});
  };
  if (currentPanel!="services"){
    $("#servicesCaption").animate({"left":50},{queue:false, duration:250});
    $("#servicesCaption").animate({"opacity":0},{queue:false, duration:250});
    $("#servicesButton").css({"background-position":"0px -128px"});
  };
  if (currentPanel!="contact"){
    $("#contactCaption").animate({"left":50},{queue:false, duration:250});
    $("#contactCaption").animate({"opacity":0},{queue:false, duration:250});
    $("#contactButton").css({"background-position":"0px -192px"});
  };
  switch(button){
    case "none":
    break;
    case "about":
      $("#aboutCaption").animate({"left":70},{queue:false, duration:250});
      $("#aboutCaption").animate({"opacity":1},{queue:false, duration:250});
      $("#aboutButton").css({"background-position":"65px 0px"});
    break;
    case "portfolio":
      $("#portfolioCaption").animate({"left":70},{queue:false, duration:250});
      $("#portfolioCaption").animate({"opacity":1},{queue:false, duration:250});
      $("#portfolioButton").css({"background-position":"65px -64px"});
    break;
    case "services":
      $("#servicesCaption").animate({"left":70},{queue:false, duration:250});
      $("#servicesCaption").animate({"opacity":1},{queue:false, duration:250});
      $("#servicesButton").css({"background-position":"65px -128px"});
    break;
    case "contact":
      $("#contactCaption").animate({"left":70},{queue:false, duration:250});
      $("#contactCaption").animate({"opacity":1},{queue:false, duration:250});
      $("#contactButton").css({"background-position":"65px -192px"});
    break;
  };

};





































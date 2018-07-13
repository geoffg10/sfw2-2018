
$(document).ready(function(){
		var getShit = $(document)
		init();
    
    function init(){
        container = $('#container');
		win = $(window);
        
        $.fetcher([
			["templates/landing.html"],
			["templates/app.html"]
		]).then(checkLoginState)
        
    }
        
    function checkLoginState(){
        $.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.error){
					loadLanding(response);
                    console.log("land - response",response)
				}else{
					loadApp(response);
                    console.log(response)
				}
			}
		});
    }
    
    
    function loadLanding(r){
        
        $.get('templates/landing.html', function(html){
		
			var h = $(html);
			var landingCode = h.find('#template_landing').html();
			
			$.template('landing', landingCode);		// compile template
			h = $.render(r.error, 'landing');		// use template
			
			container.html(h) 
			
		});
    }
    
    
    function loadApp(r){
        $.get('templates/app.html', function(html){
		
			var h = $(html);
			var appCode = h.find('#template_app').html();
			
			
			$.template('app', appCode);		// compile template
			h = $.render(r.user, 'app');		// use template
										console.log(r.user)
										console.log(r.user.id)//getting the user id
			container.html(h) 
			$('#welcomeUser').html('<p class="welcomeUser">'+r.user.user_n+'</p>')
loadDashboard(appCode);
//		getTasks();
		});
        
    }

    
    function login(username,password){
        $.ajax({
			url: 'xhr/login.php',
			type: 'post',
			dataType: 'json',
			data: {
				username: username,
				password: password
			},
			success: function(response){
				console.log(response)
				if(response.user){
					
					checkLoginState();
				}else{
					console.log('FAIL')			
				};
			}
		});
        
    }
 
    function logOut(){
        $.ajax({
			url: 'xhr/logout.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.success){
					checkLoginState();
				}	
			}	
		});
    }
    	
function register(email,username,password){
    $.ajax({
			url: 'xhr/register.php',
			type: 'post',
			dataType: 'json',
			data: {
				email: email,
                username: username,
				password: password
			},
			success: function(response){
//                console.log(response);
                if(response.error){
                    $('#registerErrorTxt').html('<p class="registerEr">'+response.error+'</p>')
                }else{
                    checkLoginState()
                }

			}
		});
}
    function loadDashboard(appCode){
         $.get('templates/app.html', function(html){
                    var project_tmpl = $(html).find('#projectTemplate').html();
                    $.template('project', project_tmpl);
//                    var html = $.render(response.projects, 'project');
                    $("#mainWrapper").append(project_tmpl)
             getProjects(appCode)
                })
        
    }
    
    function getProjects(appCode){
        $.ajax({
			url: 'xhr/get_projects.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
                $.get('templates/app.html', function(html){
                    for(var i =0; i<response.projects.length; i++){
                        var allProjects = response.projects[i]
//                        console.log("all Proj:",allProjects)
			         }
                    console.log(response.projects)
                    var project_tmpl = $(html).find('#projectList_Template').html();
                    $.template('project', project_tmpl);
                    var html = $.render(response.projects, 'project');
                    $(".projectsData").append(html)
                })
		  }
        })
    }
    
    
        function getProjectDetailsPage(projectClicked){
            $("#mainWrapper").html('')
            $.ajax({
			url: 'xhr/get_projects.php',
			type: 'get',
			dataType: 'json',
			 success: function(response){
                $.get('templates/app.html', function(html){
                    for(var i =0; i<response.projects.length; i++){
                        var allProjects = response.projects[i]
                           if(allProjects.id == projectClicked){
                               var projectSelcted = allProjects
                               var project_tmpl = $(html).find('#projectDetailsPg').html();
                                $.template('project', project_tmpl);
                                var html = $.render(projectSelcted, 'project');
                                $("#mainWrapper").append(html)
                           }else{

                           }//end of else
                    }//end of forloop
			     })// end of get template
		      }//end of success
            })//end of ajax
        }//end of function
    
    function getTasks(projectClicked){
        $.ajax({
			url: 'xhr/get_tasks.php',
			type: 'get',
			dataType: 'json',
            data: {
				projectID: projectClicked
			},
			success: function(response){
            $.get('templates/app.html', function(html){
                for(var i =0; i<response.tasks.length; i++){
                        var allTasks = response.tasks[i]
                        console.log("all tasks:", allTasks)
			         }
//				console.log("tasks",response)
                 var task_tmpl = $(html).find('#taskData').html();
                    $.template('tasks', task_tmpl);
                    var html = $.render(response.tasks, 'tasks');
                    $("#tasksData").append(html)
                
			})
            }
		})
    }




$(document).on('click', '.loginBTN', function(e){
    $("#loginModal").on('hidden.bs.modal', function (e) {
            var username = $("#userName").val()
            var password = $("#password").val()
//         console.log(username)  
        login(username,password)
    })
});

$(document).on('click', '.registerBTN', function(e){
    $("#registerModal").on('hidden.bs.modal', function (e) {
            var email = $("#exampleInputEmail1").val()
            var username = $("#exampleInputUsername").val()
            var password = $("#exampleInputPassword1").val()
//         console.log(username)  
        register(email,username,password)
    })
});

$(document).on('click', '.logOutBtn', function(){
   logOut()
});
    
$(document).on('click', ".projectRow", function(e){
    var projectClicked = this.id
    getProjectDetailsPage(projectClicked)
    getTasks(projectClicked)
    
});
$(document).on('click', '.backDashboard', function(){
    console.log("hello")
    checkLoginState()
});

	
	
	

		
	}); // end document ready
	






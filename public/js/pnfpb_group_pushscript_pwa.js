//
// Script to Subscribe push notification for particular BuddyPress Group users using Firebase
// To send push notification only for members belonging to group
// @since 1.8
//

var $j = jQuery.noConflict();

var unsubscribeGroupid;
var subscribeGroupid;
var pnfpb_pushtoken_fromflutter = '';

var standalone_group_pwa = window.navigator.standalone;
var userAgent_group_pwa = window.navigator.userAgent.toLowerCase();
var safari_group_pwa = /safari/.test(userAgent_group_pwa);
var ios_group_pwa = /iphone|ipod|ipad/.test(userAgent_group_pwa);
	
var pnfpb_webview = false;

if (ios_group_pwa) {
  if (!standalone_group_pwa && safari_group_pwa) {
    // Safari
    pnfpb_webview = false;
  } else if (!standalone_group_pwa && !safari_group_pwa) {
    // iOS webview
    pnfpb_webview = true;
  };
} else {
  if (userAgent_group_pwa.includes('wv')) {
    // Android webview
    pnfpb_webview = true;
  } else {
    // Chrome
    pnfpb_webview = false;
  }
};


$j(document).ready(function() {
	
		const { __ } = wp.i18n;
		
		if (firebase.messaging.isSupported()) {
			navigator.serviceWorker.register(pnfpb_ajax_object_group_push.homeurl+'/pnfpb_icpush_pwa_sw.js',{scope:pnfpb_ajax_object_group_push.homeurl+'/'}).then(function(registration) {				
				var groupId =  '0';
				const messaging = firebase.messaging();
            	if (Notification.permission === 'granted') {
                        messaging.getToken({serviceWorkerRegistration: registration, vapidKey:pnfpb_ajax_object_group_push.publicKey }).then((currentToken) => {
						if (currentToken) {
						deviceid = currentToken;
								$j(".group-button").on("click",".join-group", function() {
									var join_group_string_array = $j(this).parent().attr('id').split("-");
									if (join_group_string_array.length > 0) {
										var join_group_id = join_group_string_array[1];
										var join_group_unsubscribebuttonname = '.unsubscribegroupbutton-'+join_group_id;
										var join_group_subscribebuttonname = '.subscribegroupbutton-'+join_group_id;
										var join_group_unsubscribebuttonid = '#unsubscribegroupbutton-'+join_group_id;
										var join_group_subscribebuttonid = '#subscribegroupbutton-'+join_group_id;																				$j(join_group_subscribebuttonname).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
										$j(join_group_unsubscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
										$j(join_group_subscribebuttonid).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
										$j(join_group_unsubscribebuttonid).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );										
									}
								});
							
								$j(".group-button").on("click",".leave-group", function() {
									var leave_group_string_array = $j(this).parent().attr('id').split("-");
									if (leave_group_string_array.length > 0) {
										var leave_group_id = leave_group_string_array[1];
										var leave_group_unsubscribebuttonname = '.unsubscribegroupbutton-'+leave_group_id;
										var leave_group_subscribebuttonname = '.subscribegroupbutton-'+leave_group_id;
										var leave_group_unsubscribebuttonid = '#unsubscribegroupbutton-'+leave_group_id;
										var leave_group_subscribebuttonid = '#subscribegroupbutton-'+leave_group_id;
										$j(leave_group_subscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
										$j(leave_group_unsubscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
										$j(leave_group_subscribebuttonid).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
										$j(leave_group_unsubscribebuttonid).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
										
									}
									if (currentToken) {
										        	deviceid = currentToken;
										        	var data = {
											        	action: 'icpushcallback',
											        	device_id:deviceid,
														bpgroup_id:leave_group_id,
											        	pushtype: 'unsubscribe-group-button'
										        	};
								
										        	$j.post(pnfpb_ajax_object_group_push.ajax_url, data, function(response) {
										            
							        
			                                            if (response != 'fail')
			                                            {
    	                                                    if (response != 'duplicate'){
    	                                                        
																	$j(leave_group_subscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
																	$j(leave_group_unsubscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
			                                                    }
			                                                    else
			                                                    {
			           
			                                                        console.log(__("Push notification unsubscription failed..try again!!",'PNFPB_TD'));
			                                                    }

			                                            }

							
										        });	
									}
								});	


								$j(document).on("click",".join-group", function() {
									var join_group_string_array = $j(this).parent().attr('id').split("-");
									if (join_group_string_array.length > 0) {
										var join_group_id = join_group_string_array[1];
										var join_group_unsubscribebuttonname = '.unsubscribegroupbutton-'+join_group_id;
										var join_group_subscribebuttonname = '.subscribegroupbutton-'+join_group_id;
										var join_group_unsubscribebuttonid = '#unsubscribegroupbutton-'+join_group_id;
										var join_group_subscribebuttonid = '#subscribegroupbutton-'+join_group_id;
										$j(join_group_subscribebuttonname).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
										$j(join_group_unsubscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );											$j(join_group_subscribebuttonid).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
										$j(join_group_unsubscribebuttonid).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );	
									}
								});
							
								$j(document).on("click",".leave-group", function() {
									var leave_group_string_array = $j(this).parent().attr('id').split("-");
									if (leave_group_string_array.length > 0) {
										var leave_group_id = leave_group_string_array[1];
										var leave_group_unsubscribebuttonname = '.unsubscribegroupbutton-'+leave_group_id;
										var leave_group_subscribebuttonname = '.subscribegroupbutton-'+leave_group_id;
										var leave_group_unsubscribebuttonid = '#unsubscribegroupbutton-'+leave_group_id;
										var leave_group_subscribebuttonid = '#subscribegroupbutton-'+leave_group_id;
										$j(leave_group_subscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
										$j(leave_group_unsubscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
										$j(leave_group_subscribebuttonid).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
										$j(leave_group_unsubscribebuttonid).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
										
									}
									if (currentToken) {
										        	deviceid = currentToken;
										        	var data = {
											        	action: 'icpushcallback',
											        	device_id:deviceid,
														bpgroup_id:leave_group_id,
											        	pushtype: 'unsubscribe-group-button'
										        	};
								
										        	$j.post(pnfpb_ajax_object_group_push.ajax_url, data, function(response) {
										            
									        
			                                            if (response != 'fail')
			                                            {
    	                                                    if (response != 'duplicate'){
    	                                                        
																	$j(leave_group_subscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
																	$j(leave_group_unsubscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
			                                                    }
			                                                    else
			                                                    {
			           
			                                                        console.log(__("Push notification unsubscription failed..try again!!",'PNFPB_TD'));
			                                                    }

			                                            }

							
										        });	
									}
								});	
							
							
							
		    					$j(document).on( "click",".subscribe-notification-group", function(e) {
									e.preventDefault();
									groupId = $j(this).attr("data-group-id");
									var unsubscribebuttonname = '.unsubscribegroupbutton-'+groupId;
									var subscribebuttonname = '.subscribegroupbutton-'+groupId;
									var unsubscribebuttonid = '#unsubscribegroupbutton-'+groupId;
									var subscribebuttonid = '#subscribegroupbutton-'+groupId;										
									if( $j("#pnfpb_group_users_subscribe_dialog_confirm").length ) {
									//console.log('dialog');
									}
									else
									{
										$j(this).append( '<div id="pnfpb_group_users_subscribe_dialog_confirm" class="pnfpb_group_users_subscribe_dialog_confirm" title="Subscribe" style="display:none;"><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>'+pnfpb_ajax_object_group_push.group_subscribe_dialog_text+'</div><div id="pnfpb-group-unsubscribe-dialog" title="Confirmation"><div id="pnfpb-group-unsubscribe-alert-msg" class="pnfpb-group-unsubscribe-alert-msg"></div></div>' );
									}
 									var subscribe_button_text = pnfpb_ajax_object_group_push.subscribe_button_text;
						        	$j( "#pnfpb_group_users_subscribe_dialog_confirm" ).dialog({  
										resizable: false,
										height: "auto",
										closeText : '',
							        	modal: true,
							        	buttons: [{
      										text: subscribe_button_text,
											open: function() {
												$j(this).attr('style','font-weight:bold;color:'+pnfpb_ajax_object_group_push.subscribe_button_text_color+';background-color:'+pnfpb_ajax_object_group_push.subscribe_button_color+';border:0px');
											},
      										click: function() {												
									        	if (currentToken) {
							   
										        	deviceid = currentToken;
										        	//console.log(deviceid);
							
										        	var data = {
											        	action: 'icpushcallback',
											        	device_id:deviceid,
														bpgroup_id:groupId,
											        	pushtype: 'subscribe-group-button'
										        	};
								
										        	$j.post(pnfpb_ajax_object_group_push.ajax_url, data, function(response) {
										            
										        
			                                            if (response != 'fail')
			                                            {
    	                                                    if (response != 'duplicate'){
    	                                                        
			       			                                    $j(".pnfpb-group-unsubscribe-alert-msg").html("<p>"+pnfpb_ajax_object_group_push.group_subscribe_dialog_text_confirm+"</p>");
			       			                                    $j( "#pnfpb-group-unsubscribe-dialog" ).dialog();
																$j(subscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
																$j(unsubscribebuttonname).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
																$j(subscribebuttonid).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
																$j(unsubscribebuttonid).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
																
			                                                 }
			                                                 else
			                                                 {
			                                                    console.log(__("Already subscribed...device id already exists...not updated",'PNFPB_TD'));
			                                                 }

			                                            }
			                                            else
			                                            {

                                                           
                                                            $j(".pnfpb-group-unsubscribe-alert-msg").html(__("Push notification subscription failed..try again!!",'PNFPB_TD'));
                                                            
                                                            $j( "#pnfpb-group-unsubscribe-dialog" ).dialog();

			                                                console.log(__("device update failed",'PNFPB_TD'));
			                                            }
							
										        });
							
									        }									
											$j( "#pnfpb_group_users_subscribe_dialog_confirm" ).dialog("close");
								        },
								        Cancel: function() {
									        $j( "#pnfpb_group_users_subscribe_dialog_confirm" ).dialog("close");
								        }
							        }]
    						    })
								})
		    					$j(document).on( "click",".unsubscribe-notification-group", function(e) {
									e.preventDefault();
									groupId = $j(this).attr("data-group-id");
									var unsubscribebuttonname = '.unsubscribegroupbutton-'+groupId;
									var subscribebuttonname = '.subscribegroupbutton-'+groupId;
									var unsubscribebuttonid = '#unsubscribegroupbutton-'+groupId;
									var subscribebuttonid = '#subscribegroupbutton-'+groupId;
									if( $j("#pnfpb_group_users_unsubscribe_dialog_confirm").length ) {
									//console.log('dialog');
									}
									else
									{
										$j(this).append( '<div id="pnfpb_group_users_unsubscribe_dialog_confirm" class="pnfpb_group_users_unsubscribe_dialog_confirm" title="Unsubscribe" style="display:none;"><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>'+pnfpb_ajax_object_group_push.group_unsubscribe_dialog_text+'</div><div id="pnfpb-group-unsubscribe-dialog" title="Confirmation"><div id="pnfpb-group-unsubscribe-alert-msg" class="pnfpb-group-unsubscribe-alert-msg"></div></div>' );
									}
									var unsubscribe_button_text = pnfpb_ajax_object_group_push.unsubscribe_button_text;									
						        	$j( "#pnfpb_group_users_unsubscribe_dialog_confirm" ).dialog({  
										resizable: false,
										height: "auto",
										closeText : '',
							        	modal: true,
							        	buttons: [{
      										text: unsubscribe_button_text,
											open: function() {
												$j(this).attr('style','font-weight:bold;color:'+pnfpb_ajax_object_group_push.subscribe_button_text_color+';background-color:'+pnfpb_ajax_object_group_push.subscribe_button_color+';border:0px');
											},
      										click: function() {	
									        	if (currentToken) {
							   
										        	deviceid = currentToken;
							
										        	var data = {
											        	action: 'icpushcallback',
											        	device_id:deviceid,
														bpgroup_id:groupId,
											        	pushtype: 'unsubscribe-group-button'
										        	};
								
										        	$j.post(pnfpb_ajax_object_group_push.ajax_url, data, function(response) {
										            
									        
			                                            if (response != 'fail')
			                                            {
    	                                                    if (response != 'duplicate'){
    	                                                        
																$j(unsubscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
																$j(subscribebuttonname).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
																$j(unsubscribebuttonid).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
																$j(subscribebuttonid).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
																
																$j(".pnfpb-group-unsubscribe-alert-msg").html("<p>"+pnfpb_ajax_object_group_push.group_unsubscribe_dialog_text_confirm+"</p>");
																
																$j( "#pnfpb-group-unsubscribe-dialog" ).dialog();
																
			                                                  }
			                                                  else
			                                                  {
			           
			                                                        console.log(__("Push notification unsubscription failed..try again!!",'PNFPB_TD'));
			                                                    }

			                                            }
			                                            else
			                                            {

                                                           
                                                            $j(".pnfpb-group-unsubscribe-alert-msg").html(__("Push notification unsubscription failed..try again!!",'PNFPB_TD'));
                                                            
                                                            $j( "#pnfpb-group-unsubscribe-dialog" ).dialog();

			                                                console.log(__("device update failed",'PNFPB_TD'));
			                                            }
							
										        });
							
									        }
											$j("#pnfpb_group_users_unsubscribe_dialog_confirm").dialog("close");
								        },
								        Cancel: function() {
									        $j( "#pnfpb_group_users_unsubscribe_dialog_confirm" ).dialog( "close" );
								        }
							        }]
    						    })
								})
							
						
    						    $j('#pnfpb_group_users_unsubscribe_dialog_confirm').on('dialogclose', function(event) {
                                    $j(".pnfpb-group-unsubscribe-alert-msg").html("");
                                    $j(".pnfpb-group-subscribe-alert-msg").html("");
                                });							
    						    $j('#pnfpb_group_users_subscribe_dialog_confirm').on('dialogclose', function(event) {
                                    $j(".pnfpb-group-unsubscribe-alert-msg").html("");
                                    $j(".pnfpb-group-subscribe-alert-msg").html("");
                                });
							
 			
			                             
						
						}
                        });
                        
                  }
                  else
                  {
							
					$j(".pnfpb-group-unsubscribe-alert-msg").html(__("UnSubscribe/Subscribe failed..try again ..Please!!",'PNFPB_TD'));
							
					$j( "#pnfpb-group-unsubscribe-dialog" ).dialog();                        
                  }
                    
				})
			}
			else
			{
				//if (pnfpb_pushtoken_fromflutter !== '') {
					console.log(__('This browser does not support PUSHAPI Firebase messaging!!!','PNFPB_TD'));
					$j(document).on( "click",".subscribe-notification-group", function(e) {
						e.preventDefault();
						groupId = $j(this).attr("data-group-id");
						var unsubscribebuttonname = '.unsubscribegroupbutton-'+groupId;
						var subscribebuttonname = '.subscribegroupbutton-'+groupId;
						var unsubscribebuttonid = '#unsubscribegroupbutton-'+groupId;
						var subscribebuttonid = '#subscribegroupbutton-'+groupId;										
						if( $j("#pnfpb_group_users_subscribe_dialog_confirm").length ) {
							//console.log('dialog');
						}
						else
						{
							$j(this).append( '<div id="pnfpb_group_users_subscribe_dialog_confirm" class="pnfpb_group_users_subscribe_dialog_confirm" title="Subscribe" style="display:none;"><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>'+pnfpb_ajax_object_group_push.group_subscribe_dialog_text+'</div><div id="pnfpb-group-unsubscribe-dialog" title="Confirmation"><div id="pnfpb-group-unsubscribe-alert-msg" class="pnfpb-group-unsubscribe-alert-msg"></div></div>' );
						}
 						var subscribe_button_text = pnfpb_ajax_object_group_push.subscribe_button_text;
						$j( "#pnfpb_group_users_subscribe_dialog_confirm" ).dialog({  
							resizable: false,
							height: "auto",
							closeText : '',
			   				modal: true,
			   				buttons: [{
      							text: subscribe_button_text,
								open: function() {
								$j(this).attr('style','font-weight:bold;color:'+pnfpb_ajax_object_group_push.subscribe_button_text_color+';background-color:'+pnfpb_ajax_object_group_push.subscribe_button_color+';border:0px');
											},
      							click: function() {
									const d = new Date();
									d.setTime(d.getTime() + (365*24*60*60*1000));
									let expires = "expires="+ d.toUTCString();
									var cookievalue = "pnfpb_group_push_notification_"+groupId + "=" + "expiretime" + ";" + expires + ";path=/";
									document.cookie = cookievalue;
									
									if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.subscribeGroupid) {
       									window.webkit.messageHandlers.subscribeGroupid.postMessage({
                     						"message": groupId
       									});
									}									
									
									if (subscribeGroupid) {
										subscribeGroupid.postMessage(groupId);
									}								
									$j(".pnfpb-group-unsubscribe-alert-msg").html("<p>"+pnfpb_ajax_object_group_push.group_subscribe_dialog_text_confirm+"</p>");
			       			    	$j( "#pnfpb-group-unsubscribe-dialog" ).dialog();
									$j(subscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
									$j(unsubscribebuttonname).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
									$j(subscribebuttonid).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
									$j(unsubscribebuttonid).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );														
						 	 $j( "#pnfpb_group_users_subscribe_dialog_confirm" ).dialog("close");
							},
							Cancel: function() {
								$j( "#pnfpb_group_users_subscribe_dialog_confirm" ).dialog("close");
							}
						}]
    				})

				});
					
		    	$j(document).on( "click",".unsubscribe-notification-group", function(e) {
					e.preventDefault();
					groupId = $j(this).attr("data-group-id");
					document.cookie = "pnfpb_group_push_notification_"+groupId + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"				
					var unsubscribebuttonname = '.unsubscribegroupbutton-'+groupId;
					var subscribebuttonname = '.subscribegroupbutton-'+groupId;
					var unsubscribebuttonid = '#unsubscribegroupbutton-'+groupId;
					var subscribebuttonid = '#subscribegroupbutton-'+groupId;
					if( $j("#pnfpb_group_users_unsubscribe_dialog_confirm").length ) {
						//console.log('dialog');
					}
					else
					{
						$j(this).append( '<div id="pnfpb_group_users_unsubscribe_dialog_confirm" class="pnfpb_group_users_unsubscribe_dialog_confirm" title="Unsubscribe" style="display:none;"><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>'+pnfpb_ajax_object_group_push.group_unsubscribe_dialog_text+'</div><div id="pnfpb-group-unsubscribe-dialog" title="Confirmation"><div id="pnfpb-group-unsubscribe-alert-msg" class="pnfpb-group-unsubscribe-alert-msg"></div></div>' );
					}
					var unsubscribe_button_text = pnfpb_ajax_object_group_push.unsubscribe_button_text;									
					$j( "#pnfpb_group_users_unsubscribe_dialog_confirm" ).dialog({  
						resizable: false,
						height: "auto",
						closeText : '',
					    modal: true,
						buttons: [{
      						text: unsubscribe_button_text,
							open: function() {
								$j(this).attr('style','font-weight:bold;color:'+pnfpb_ajax_object_group_push.subscribe_button_text_color+';background-color:'+pnfpb_ajax_object_group_push.subscribe_button_color+';border:0px');
							},
      						click: function() {
								
								if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.unsubscribeGroupid) {
       								window.webkit.messageHandlers.unsubscribeGroupid.postMessage({
                     					"message": groupId
       								});
								}								
								
								if (unsubscribeGroupid) {
									unsubscribeGroupid.postMessage(groupId);
								}								
								$j(unsubscribebuttonname).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
								$j(subscribebuttonname).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
								$j(unsubscribebuttonid).removeClass( "subscribe-display-on" ).addClass( "subscribe-display-off" );
								$j(subscribebuttonid).removeClass( "subscribe-display-off" ).addClass( "subscribe-display-on" );
								$j(".pnfpb-group-unsubscribe-alert-msg").html("<p>"+pnfpb_ajax_object_group_push.group_unsubscribe_dialog_text_confirm+"</p>");
								$j( "#pnfpb-group-unsubscribe-dialog" ).dialog();
								$j("#pnfpb_group_users_unsubscribe_dialog_confirm").dialog("close");
							},
						Cancel: function() {
							$j( "#pnfpb_group_users_unsubscribe_dialog_confirm" ).dialog( "close" );
						}
					}]
				})
			})				
		//}		
	}



	

/*function PNFPB_from_Flutter_mobileapp(pushtoken) {
	
 pnfpb_pushtoken_fromflutter = pushtoken;
	
 return pnfpb_pushtoken_fromflutter;
	
}*/
	

});

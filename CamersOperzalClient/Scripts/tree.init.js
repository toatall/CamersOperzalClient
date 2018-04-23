			$(function(){
				$("#tree").dynatree({
					checkbox: true,
      				selectMode: 3,
				      onSelect: function(select, node) {
				        var selNodes = node.tree.getSelectedNodes();
				        var selKeys = $.map(selNodes, function(node){
				             return node.data.key;
				        });
						$("#tree-result").val(selKeys.join(","));
				      },
				      onClick: function(node, event) {
				        if( node.getEventTargetType(event) == "title" )
				          node.toggleSelect();
				      },
				      onKeydown: function(node, event) {
				        if( event.which == 32 ) {
				          node.toggleSelect();
				          return false;
				        }
				      },
					  onExpand: function(flag, node){
						$(node.tree.divTree).parent().parent().parent().parent().jScrollPane();
					  }, 
				      cookieId: "dynatree-1",
				      idPrefix: "dynatree-1"
				});

				$("#btnToggleSelect").click(function(){
					$("#tree").dynatree("getRoot").visit(function(node){
						node.toggleSelect();
					});
					return false;
				});
				$("#btnDeselectAll").click(function(){
					$("#tree").dynatree("getRoot").visit(function(node){
						node.select(false);
					});
					return false;
				});
				$("#btnSelectAll").click(function(){
					$("#tree").dynatree("getRoot").visit(function(node){
						node.select(true);
					});
					return false;
				});
				CheckTreeNodes("tree");

			});
			
			$(function(){
				$("#tree2").dynatree({
					checkbox: true,
      				selectMode: 3,
				      onSelect: function(select, node) {
				        var selNodes = node.tree.getSelectedNodes();
				        var selKeys = $.map(selNodes, function(node){
				             return node.data.key;
				        });
						$("#tree2-result").val(selKeys.join(","));
				      },
				      onClick: function(node, event) {
				        if( node.getEventTargetType(event) == "title" )
				          node.toggleSelect();
				      },
				      onKeydown: function(node, event) {
				        if( event.which == 32 ) {
				          node.toggleSelect();
				          return false;
				        }
				      },
					  onExpand: function(flag, node){
						$(node.tree.divTree).parent().parent().parent().parent().jScrollPane();
					  },
				      cookieId: "dynatree-2",
				      idPrefix: "dynatree-2"
				});

				$("#btnDeselectAll2").click(function(){
					$("#tree2").dynatree("getRoot").visit(function(node){
						node.select(false);
					});
					return false;
				});
				$("#btnSelectAll2").click(function(){
					$("#tree2").dynatree("getRoot").visit(function(node){
						node.select(true);
					});
					return false;
				});
				CheckTreeNodes("tree2");

			});
			
			$(function(){
				$("#tree3").dynatree({
					checkbox: true,
      				selectMode: 3,
				      onSelect: function(select, node) {
				        var selNodes = node.tree.getSelectedNodes();
				        var selKeys = $.map(selNodes, function(node){
				             return node.data.key;
				        });
						$("#tree3-result").val(selKeys.join(","));
				      },
				      onClick: function(node, event) {
				        if( node.getEventTargetType(event) == "title" )
				          node.toggleSelect();
				      },
				      onKeydown: function(node, event) {
				        if( event.which == 32 ) {
				          node.toggleSelect();
				          return false;
				        }
				      },
					  onExpand: function(flag, node){
						$(node.tree.divTree).parent().parent().parent().parent().jScrollPane();
					  },
				      cookieId: "dynatree-3",
				      idPrefix: "dynatree-3"
				});

				$("#btnDeselectAll3").click(function(){
					$("#tree3").dynatree("getRoot").visit(function(node){
						node.select(false);
					});
					return false;
				});
				$("#btnSelectAll3").click(function(){
					$("#tree3").dynatree("getRoot").visit(function(node){
						node.select(true);
					});
					return false;
				});
				
				CheckTreeNodes("tree3");

			});
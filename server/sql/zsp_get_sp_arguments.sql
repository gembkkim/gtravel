use gtraveldb
go

drop procedure zsp_get_sp_arguments;
go

--* ----------------------------------------------------*---------------------------*-------------------*-------------------------------
create procedure zsp_get_sp_arguments					@sp_name					varchar(1000)		--* 저장프로시저명
as
begin
 select p.name as argument
	  , (select type_name(p.user_type_id)) as datatype
	  , p.max_length as length
	  , (select case when p.is_output=0 then 'in' else 'out' end) as inout
	  , p.precision as prec
	  , p.scale as scale
   from sys.objects o
      , sys.all_parameters p  
  where o.object_id = p.object_id
    and o.name = @sp_name
  order by p.parameter_id

  -- zsp_get_sp_arguments 'asp_users_u'

end
go

use gtraveldb
go

/*

 select user_id 
      , name    
      , age     
      , sex_ty  
      , note    
   into #base
   from users

drop table users
go

create table users(
    user_id                     varchar(32)         not null,   --* 사용자ID
    name                        varchar(50)         null,       --* 성명
    age                         int                 null,       --* 나이
    sex_ty                      varchar(50)         null,       --* 성별구분
    note                        varchar(1000)       null,       --* 비고
    primary key(user_id)
)
go

 insert into users
 select *
   from #base

*/


drop procedure asp_users_s
go

--* ----------------------------------------------------*---------------------------*-------------------*-------------------------------
create procedure asp_users_s                            @user_id_s                  varchar(32)         --* 사용자ID   
as
begin
     select * 
       from users
      where user_id like '%' + @user_id_s + '%'
      order by user_id

	--* asp_users_s 'gem'
	--* asp_users_s ''
end
go

drop procedure asp_users_k
go

--* ----------------------------------------------------*---------------------------*-------------------*-------------------------------
create procedure asp_users_k 			                @user_id_s                  varchar(32)         --* 사용자ID     
as
begin
     select * 
       from users
      where user_id like '%' + @user_id_s + '%'
	
	--* asp_users_k 'gembkkim'
end
go

drop procedure asp_users_u
go

--* ----------------------------------------------------*---------------------------*-------------------*-------------------------------
create procedure asp_users_u                            @user_id                    varchar(32)			--* 사용자ID     
                                                      , @name                       varchar(50)         --* 성명    
                                                      , @age                        int                 --* 나이    
                                                      , @sex_ty                     varchar(50)         --* 성별구분
                                                      , @note                       varchar(1000)       --* 비고    
as
begin

	declare @affected_rows int
	      , @message       varchar(1000)
     select @affected_rows = 0
	      , @message = ''

    if exists(   select *
                   from users
                  where user_id = @user_id )
    begin
         update users 
            set name   = @name   
              , age    = @age       
              , sex_ty = @sex_ty   
              , note   = convert(char(23), getdate(), 21) 
          where user_id = @user_id

		 select @affected_rows = 1
		      , @message = 'Ok'
    end
    else
    begin
         insert into users( user_id 
                          , name    
                          , age     
                          , sex_ty  
                          , note 
                            )
         values( @user_id                          
               , @name 	
               , @age 	
               , @sex_ty 
               , @note 
                 )  

		 select @affected_rows = 1
		      , @message = 'Ok'
    end               

	 select @affected_rows as affected_rows
	      , @message as message

	--* asp_users_u '121212', '1212', 12, 'F', '1212121212'
end
go

drop procedure asp_users_d
go

--* ----------------------------------------------------*---------------------------*-------------------*-------------------------------
create procedure asp_users_d                            @user_id                    varchar(32)         --* 사용자ID     
as
begin

	declare @affected_rows int
	      , @message       varchar(1000)
     select @affected_rows = 0
	      , @message = ''

	 delete                  
       from users             
      where user_id = @user_id

     select @affected_rows = 1
          , @message = 'Ok'

	 select @affected_rows as affected_rows
	      , @message as message

	--* asp_users_d '12128811'
	--* asp_users_s ''

end
go

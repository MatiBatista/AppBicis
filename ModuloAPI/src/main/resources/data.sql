INSERT INTO soport_biclycle (id_soport_biclycle,name, habilitado)
VALUES (0,'SOPORTE1', 1),(1,'SOPORTE2', 1),(2,'SOPORTE3', 1),(3,'SOPORTE4', 1),(4,'SOPORTE5', 1);

INSERT INTO `role` (id_role,name)
VALUES (0,'user'),(1,'admin');

insert into user (id_user,dni,email,last_name,name,num_prone,password,username,role_id_role) values
                                                                                                 (1,42100876,"Batista","Matias","11534342","1234","mati",0),
                                                                                                 (2,4323242,"Etcheverry","Juani","22134342","1234","juani",1);
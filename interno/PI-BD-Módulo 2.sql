CREATE SEQUENCE cidades_id
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 100;

create table cidades(
  id integer primary key not null,
  cidade varchar(30) not null,
  estado varchar(30) not null,
  pais varchar(30) not null);
insert into cidades values (cidades_id.nextval, 'Campinas','São Paulo','Brasil');
insert into cidades values (cidades_id.nextval, 'Guarulhos', 'São Paulo', 'Brasil');
insert into cidades values (cidades_id.nextval, 'Foz do Iguaçu', 'Paraná', 'Brasil');
insert into cidades values (cidades_id.nextval, 'Rio de Janeiro', 'Rio de Janeiro', 'Brasil');
insert into cidades values (cidades_id.nextval, 'Manaus', 'Amazonas', 'Brasil');
insert into cidades values (cidades_id.nextval, 'Brasília', 'Distrito Federal', 'Brasil');
insert into cidades values (cidades_id.nextval, 'Salvador', 'Bahia',  'Brasil');
insert into cidades values (cidades_id.nextval, 'Confins', 'Minas Gerais', 'Brasil');
insert into cidades values (cidades_id.nextval, 'Belo Horizonte', 'Minas Gerais', 'Brasil');
insert into cidades values (cidades_id.nextval, 'São José dos Pinhais', 'Paraná', 'Brasil');
insert into cidades values (cidades_id.nextval, 'São Paulo', 'São Paulo','Brasil');
insert into cidades values (cidades_id.nextval, 'Recife', 'Pernambuco', 'Brasil');
insert into cidades values (cidades_id.nextval, 'Porto Alegre', 'Rio Grande do Sul', 'Brasil');
insert into cidades values (cidades_id.nextval, 'Florianópolis', 'Santa Catarina', 'Brasil');
insert into cidades values (cidades_id.nextval, 'Miami', 'Flórida', 'Estados Unidos');
insert into cidades values (cidades_id.nextval, 'Buenos Aires', 'Buenos Aires', 'Argentina');
insert into cidades values (cidades_id.nextval, 'Montreal', 'Quebec', 'Canadá');
insert into cidades values (cidades_id.nextval, 'Santiago', 'Pudahuel','Chile');
insert into cidades values (cidades_id.nextval, 'Dallas', 'Texas', 'Estados Unidos');
insert into cidades values (cidades_id.nextval, 'Cidade do México', 'Distrito Federal', 'México');
insert into cidades values (cidades_id.nextval, 'Frankfurt', 'Hessen', 'Alemanha');
insert into cidades values (cidades_id.nextval, 'Nova Delhi','Haryana', 'índia');
insert into cidades values (cidades_id.nextval, 'Paris', 'Ilha de França', 'França');
insert into cidades values (cidades_id.nextval, 'Tóquio', 'Kantō', 'Japão');
insert into cidades values (cidades_id.nextval, 'Cairo', 'Cairo', 'Egito');
insert into cidades values (cidades_id.nextval, 'Londres', 'Inglaterra', 'Reino Unido');
insert into cidades values (cidades_id.nextval, 'Roma', 'Lácio', 'Itália');
insert into cidades values (cidades_id.nextval, 'Sidney', 'Nova Gales do Sul', 'Austrália');
insert into cidades values (cidades_id.nextval, 'Mumbai', 'Maharashtra', 'Índia');
insert into cidades values (cidades_id.nextval, 'Nova Iorque', 'Nova Iorque', 'Estados Unidos');
insert into cidades values (cidades_id.nextval, 'Toronto', 'Ontário', 'Canadá');
insert into cidades values (cidades_id.nextval, 'Cidade do Cabo', 'Cabo Ocidental', 'África do Sul');
insert into cidades values (cidades_id.nextval, 'Bangkok', 'Bangkok', 'Tailândia');
insert into cidades values (cidades_id.nextval, 'Munique', 'Baviera', 'Alemanha');
insert into cidades values (cidades_id.nextval, 'Cidade do México', 'Cidade do México', 'México');
insert into cidades values (cidades_id.nextval, 'Pequim', 'Pequim', 'China');
insert into cidades values (cidades_id.nextval, 'Moscou', 'Moscou', 'Rússia');
insert into cidades values (cidades_id.nextval, 'Dubai', 'Dubai', 'Emirados Árabes Unidos');
insert into cidades values (cidades_id.nextval, 'Seul', 'Seul', 'Coreia do Sul');
insert into cidades values (cidades_id.nextval, 'Buenos Aires', 'Buenos Aires', 'Argentina');
insert into cidades values (cidades_id.nextval, 'Copenhague', 'Hovedstaden', 'Dinamarca');
select * from cidades;





CREATE SEQUENCE aeronaves_id
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 100;
create table aeronaves(
  id integer primary key not null,
  numero_identificacao integer not null,
  modelo varchar(30) not null,
  fabricante varchar(30) not null,
  ano_fabricacao integer not null,
  fileiras integer not null,
  colunas integer not null,
  assentos integer not null);
insert into aeronaves VALUES(aeronaves_id.nextval, 1234	,'Airbus A320',	'Airbus'	,1987, 19, 4 ,76);
insert into aeronaves VALUES(aeronaves_id.nextval, 5678	,'Boeing 737',	'Boeing',	1967, 15, 6	,90);
insert into aeronaves VALUES(aeronaves_id.nextval, 9012	,'Boeing 777'	,'Boeing'	,1993, 25, 4 ,100);
insert into aeronaves VALUES(aeronaves_id.nextval, 3454	,'CRJ 1000'	,'Bombardier'	,2010, 25, 4, 100);
insert into aeronaves VALUES(aeronaves_id.nextval, 7945	,'Embraer E-195'	,'Embraer'	,2002, 19, 4, 76);
insert into aeronaves VALUES(aeronaves_id.nextval, 1426	,'Boeing 727'	,'Boeing'	,1984, 15, 6 ,90);
insert into aeronaves VALUES(aeronaves_id.nextval, 7817	,'Airbus A330'	,'Airbus'	,1992, 25, 4, 100);
insert into aeronaves VALUES(aeronaves_id.nextval, 1418	,'Boeing 747'	,'Boeing'	,1969, 15, 6, 90);
insert into aeronaves VALUES(aeronaves_id.nextval, 9829	,'Boeing 787'	,'Boeing'	,2007, 25, 6, 150);
insert into aeronaves VALUES(aeronaves_id.nextval, 1110	,'Boeing 767'	,'Boeing'	,1991, 25, 6, 150);
select * from aeronaves;







CREATE SEQUENCE aeroportos_id
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 100;
create table aeroportos(
  id integer primary key not null,
  aeroporto varchar(100) not null,
  cidade integer,
  constraint FK_cidade foreign key(cidade) references cidades(id) on delete cascade);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional de Viracopos',1);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional de São Paulo-Guarulhos',2);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional de Foz do IguaçuCataratas',3);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional do Rio de Janeiro - Galeão'	,4);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional de Manaus Eduardo Gomes'	,5);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional de Brasília'	,6);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional de Salvador - Deputado Luís Eduardo Magalhães'	,7);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional de Confins - Tancredo Neves'	,8);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto de Belo HorizontePampulha-MG - Carlos Drummond de Andrade'	,9);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional Afonso Pena'	,10);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto de São PauloCongonhas (CGH) – Deputado Freitas Nobre',	11);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Santos Dumont'	,4);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional do RecifeGuararapes - Gilberto Freyre'	,12);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional Porto Alegre Salgado Filho'	,13);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional de Florianópolis - Hercílio Luz',	14);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional de Miami'	,15);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroparque Jorge Newbery'	,16);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional Pierre Elliott Trudeau',	17);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Arturo Merino Benitez International Airport'	,18);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional de DallasFort Worth'	,19);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional Benito Juárez'	,20);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto de Frankfurt'	,21);
insert into aeroportos (id,aeroporto, cidade) values (aeroportos_id.nextval,'Aeroporto Internacional Indira Gandhi'	,22);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Charles de Gaulle', 23);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional de Narita', 24);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional do Cairo', 25);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto de Heathrow', 26);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto de Fiumicino', 27);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto de Kingsford Smith', 28);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional Chhatrapati Shivaji', 29);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional John F. Kennedy', 30);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional Pearson', 31);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional da Cidade do Cabo', 32);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional Suvarnabhumi', 33);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto de Munique-Franz Josef Strauss', 34);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional da Cidade do México', 35);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional de Pequim', 36);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional de Sheremetyevo', 37);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional de Dubai', 38);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto Internacional de Incheon', 39);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto de Ezeiza', 40);
insert into aeroportos (id, aeroporto, cidade) values (aeroportos_id.nextval, 'Aeroporto de Copenhague', 41);
select * from aeroportos;





CREATE SEQUENCE trajetos_id
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 100;
create table trajetos(
  id integer primary key not null,
  origem varchar(100) not null,
  destino varchar(100) not null,
  duracao varchar(30) not null,
  tipo varchar(30) not null);
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Campinas',	'Rio de Janeiro','1h 15m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Campinas',	'Foz do Iguaçu','1h 35m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Campinas',	'Manaus','3h 45m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Campinas',	'Brasília','1h 45m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Campinas',	'Salvador','2h 20m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Campinas',	'Miami','5h 55m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Guarulhos',   'Confins', '1h 15m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Guarulhos',	'São José dos Pinhais', '1h 30m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'São Paulo',	'Belo Horizonte', '1h 15m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Rio de Janeiro',	'Recife','1h 30m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Porto Alegre',	'Florianópolis','1h', 	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Buenos Aires',	'Miami','6h 30m',	'IDA E VOLTA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Montreal',	'Santiago','53m',	'SOMENTE IDA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Dallas',	'Cidade do México','2h 46m',	'SOMENTE IDA');
insert into trajetos (id,origem,destino,duracao,tipo) values(trajetos_id.nextval,'Frankfurt',	'Nova Delhi','5h 55m',	'SOMENTE IDA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Paris', 'Munique', '1h30m', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Tóquio', 'Osaka', '2h', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Cairo', 'Paris', '4h', 'SOMENTE IDA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Londres', 'Nova Iorque', '7h', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Roma', 'Sidney', '19h', 'SOMENTE IDA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Sidney', 'Mumbai', '14h', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Mumbai', 'Nova Iorque', '20h', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Nova Iorque', 'Cidade do Cabo', '16h', 'SOMENTE IDA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Toronto', 'Bangkok', '21h', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Cidade do Cabo', 'Munique', '13h', 'SOMENTE IDA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Bangkok', 'Cidade do México', '17h', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Munique', 'Pequim', '9h', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Cidade do México', 'Moscou', '14h', 'SOMENTE IDA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Pequim', 'Dubai', '9h', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Moscou', 'Seul', '6h', 'SOMENTE IDA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Dubai', 'Buenos Aires', '15h', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Seul', 'Copenhague', '10h', 'SOMENTE IDA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Buenos Aires', 'Paris', '14h', 'IDA E VOLTA');
insert into trajetos (id, origem, destino, duracao, tipo) values (trajetos_id.nextval, 'Copenhague', 'Tóquio', '18h', 'SOMENTE IDA');
select * from trajetos;



CREATE SEQUENCE voos_id
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 100;
create table voos(
  id integer primary key not null,
  data_ida varchar(30) not null,
  data_volta varchar(30),
  trajeto integer,
  aeronave integer,
  horario_ida varchar(30) not null,
  horario_volta varchar(30) not null,
  valor varchar(30) not null,
  constraint FK_trajeto foreign key(trajeto) references trajetos(id) on delete cascade,
  constraint FK_aeronaves foreign key(aeronave) references aeronaves(id) on delete cascade);
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-05','2023-12-08',	1	,1, '06:00',	    '07:15',         'R$ 700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-05','2023-12-09',	1	,1, '18:00',	'19:15',	     'R$ 700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-05','2023-12-10',	1	,1, '10:00',	'11:15',	     'R$ 700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-06','2023-12-11',    1	,1, '06:00',	    '07:15',	     'R$ 700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-06','2023-12-12',	2	,2,  '15:00',	'16:35',	     'R$ 950,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-06','2023-12-13',	2	,2,  '20:00',	'15:35',	     'R$ 950,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-07','2023-12-14',	2	,2,  '07:00',	    '08:35',	     'R$ 950,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-08','2023-12-15',	2	,2,  '10:00',	'11:35',	     'R$ 950,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-09','2023-12-16',	3	,3,  '11:00',	'14:45',	     'R$ 2.100,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-10','2023-12-17',	3	,3,  '19:00',	'22:45',	     'R$ 2.100,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-11','2023-12-18',	3	,3,  '20:00',	'23:45',	     'R$ 2.100,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-12','2023-12-19',	3	,3,  '08:00',	    '11:45',	     'R$ 2.100,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-13','2023-12-20',	4	,4,    '22:00',    '23:45',	     'R$ 1.050,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-14','2023-12-21',	4	,4,    '23:00',	'00:45',         'R$ 1.050,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-15','2023-12-22',	4	,4,     '07:30',	'09:15',	     'R$ 1.050,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-16','2023-12-23',	5	,4,     '01:00',	'03:20',	         'R$ 1.600,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-17','2023-12-24',	5	,5,'05:30',	'07:50',	         'R$ 1.600,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-18','2023-12-25',	5	,5,'16:00',	'18:20',          'R$ 1.600,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-19','2023-12-26',	6	,5,'04:00',	'09:55',	         'R$ 2.700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-20','2023-12-27',	6	,5,'10:00',	'15:55',	         'R$ 2.700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-21','2023-12-28',	6	,6	,'23:30',	'05:25',	         'R$ 2.700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-22','2023-12-29',	7	,6	,'03:00',	'04:15',	         'R$ 700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-23','2023-12-30',	7	,6	,'08:00',    '09:15',	         'R$ 700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-24','2024-01-01',	7	,6	,'10:30',	'11:45',	         'R$ 700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-25','2024-01-02',	8	,7	,'10:00',	'11:30',	     'R$ 950,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-26','2024-01-03',	8	,7	,'22:00',	'23:30',	     'R$ 950,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-27','2024-01-04',	9	,7	,'12:00',	'13:15',         'R$ 700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-28','2024-01-05',   9	,7	,'08:00',	'09:15',	     'R$ 700,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-29','2024-01-06',	10	,8,  '14:00',	'15:30',	     'R$ 950,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-30','2024-01-07',	10	,8,  '22:30',	'00:00',	     'R$ 950,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-05','2023-12-08',	11	,8,  '07:00',     '08:00',	     'R$ 650,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-06','2023-12-09',	11	,8,  '17:00',	'18:00',	     'R$ 650,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-07','2023-12-10',    12	,9,  '01:50',	    '07:20',	     'R$ 3.100,00'); 
insert into voos (id,data_ida,data_volta,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-08','2023-12-11',	12	,9,  '19:00',	'01:30',	     'R$ 3.100,00'); 
insert into voos (id,data_ida,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-05',	13	,9,  '20:00',	'20:53',	     'R$ 1.800,00'); 
insert into voos (id,data_ida,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-06',	13	,9,  '21:00',	'21:53',	     'R$ 1.800,00'); 
insert into voos (id,data_ida,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-07',	14	,10	,'05:40',	'08:26',	     'R$ 1.750,00'); 
insert into voos (id,data_ida,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-08',	14	,10	,'21:30',	'00:16',	     'R$ 1.750,00'); 
insert into voos (id,data_ida,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-09',	15	,10	,'03:00',	'08:55',	     'R$ 3.000,00'); 
insert into voos (id,data_ida,trajeto,aeronave,horario_ida,horario_volta,valor) values(voos_id.nextval,'2023-12-10',	15	,10	,'11:50',	'17:45',	         'R$ 3.000,00'); 
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-10', '2024-01-13', 1, 1, '08:00', '09:15', 'R$ 700,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-10', '2024-01-14', 2, 2, '14:30', '16:05', 'R$ 950,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-10', '2024-01-15', 3, 3, '09:30', '11:45', 'R$ 2.100,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-11', '2024-01-16', 4, 4, '03:00', '04:45', 'R$ 1.050,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-11', '2024-01-17', 5, 5, '11:30', '13:50', 'R$ 1.600,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-11', '2024-01-18', 6, 5, '19:00', '00:55', 'R$ 2.700,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-12', '2024-01-19', 7, 6, '10:00', '11:15', 'R$ 700,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-12', '2024-01-20', 8, 7, '15:30', '17:00', 'R$ 950,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-12', '2024-01-21', 9, 7, '21:00', '22:15', 'R$ 700,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-13', '2024-01-22', 10, 8, '04:30', '06:00', 'R$ 950,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-13', '2024-01-23', 11, 8, '12:00', '13:30', 'R$ 650,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-13', '2024-01-24', 12, 9, '18:30', '23:15', 'R$ 3.100,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-14', 13, 9, '01:00', '02:00', 'R$ 1.800,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-14', 14, 10, '08:30', '10:45', 'R$ 900,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-14', 15, 10, '15:00', '16:30', 'R$ 1.200,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-15', '2024-01-28', 16, 1, '20:30', '22:00', 'R$ 1.500,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-15', '2024-01-29', 17, 1, '05:00', '06:45', 'R$ 1.100,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-01-15', 18, 2, '12:30', '14:15', 'R$ 2.300,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-01', '2024-02-04', 31, 3, '08:00', '09:15', 'R$ 1.200,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-01', 32, 4, '14:30', '16:05', 'R$ 1.450,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-01', '2024-02-06', 33, 5, '09:30', '11:45', 'R$ 2.800,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-02', 34, 6, '03:00', '04:45', 'R$ 1.250,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-02', '2024-02-08', 17, 7, '11:30', '13:50', 'R$ 1.800,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-02', '2024-02-09', 18, 7, '19:00', '00:55', 'R$ 3.200,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-03', '2024-02-10', 19, 8, '10:00', '11:15', 'R$ 1.200,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-03', 20, 9, '15:30', '17:00', 'R$ 1.450,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-03', '2024-02-12', 21, 9, '21:00', '22:15', 'R$ 1.200,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-04', '2024-02-13', 22, 2, '04:30', '06:00', 'R$ 1.450,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-04', 23, 2, '12:00', '13:30', 'R$ 1.000,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-04', '2024-02-15', 24, 1, '18:30', '23:15', 'R$ 3.500,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-16', 25, 2, '08:00', '09:15', 'R$ 1.200,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-16', '2024-02-22', 26, 3, '14:30', '16:05', 'R$ 1.450,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-16', '2024-02-23', 27, 3, '21:00', '22:15', 'R$ 1.200,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-17', 28, 4, '04:30', '06:00', 'R$ 1.450,00');
insert into voos (id, data_ida, data_volta, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-17', '2024-02-25', 29, 4, '12:00', '13:30', 'R$ 1.000,00');
insert into voos (id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor) values (voos_id.nextval, '2024-02-17',  30, 5, '18:30', '23:15', 'R$ 3.500,00');
select * from voos;






CREATE SEQUENCE clientes_id
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 100;
create table cliente(
  id integer primary key not null,
  nome varchar (30) not null,
  email varchar (30) not null,
  assento integer not null,
  voo integer,
  constraint FK_voo foreign key (voo) references voos(id) on delete cascade);
insert into cliente(id, nome, email, assento, voo) values(clientes_id.nextval,'Mateus','mateusmistro1@gmail.com',1,7);
select * from cliente;




CREATE SEQUENCE assentos_id
MINVALUE 1
START WITH 1
INCREMENT BY 1;
create table assentos(
  id integer primary key not null,
  assento integer not null,
  status varchar(30) not null,
  aeronave integer,
  constraint FK_aeronave foreign key(aeronave) references aeronaves(id) on delete cascade);
select * from assentos;





CREATE SEQUENCE mapa_assentos_id
MINVALUE 1
START WITH 1
INCREMENT BY 1;
create table mapa_assentos(
  id integer primary key not null,
  id_assento integer,
  assento integer not null,
  status varchar (30) not null,
  bilhete integer not null,
  voo integer,
  constraint FK_id_assento foreign key(id_assento) references assentos(id) on delete cascade,
  constraint FK__voo foreign key(voo) references voos(id) on delete cascade);
select * from mapa_assentos;




create or replace trigger trg_gerar_assentos
after insert on aeronaves 
for each row
declare
	v_numero_assentos integer :=0; 
begin
	v_numero_assentos := :new.assentos;
	loop
		insert into assentos(id,assento,status,aeronave) 
		values(assentos_id.nextval, v_numero_assentos, 'normal',:new.id);
		v_numero_assentos := v_numero_assentos -1;
		if v_numero_assentos = 0 then 
        exit;
		end if;
	end loop;
end;





CREATE OR REPLACE TRIGGER trg_gerar_mapa_assentos
AFTER INSERT ON voos
FOR EACH ROW
DECLARE
    v_aeronave integer :=0;
    v_assentos_aeronave integer := 0;
    v_id_assento_aeronave integer := 0;
BEGIN
    v_aeronave := :new.aeronave;
    SELECT assentos INTO v_assentos_aeronave FROM aeronaves WHERE id = v_aeronave;    

    FOR i IN 1..v_assentos_aeronave LOOP
        SELECT id INTO v_id_assento_aeronave FROM assentos WHERE assento = i AND aeronave = v_aeronave;

        IF v_id_assento_aeronave IS NOT NULL THEN
            INSERT INTO mapa_assentos (id, id_assento, assento, status, bilhete, voo)            
            VALUES (mapa_assentos_id.nextval, v_id_assento_aeronave, i, 'Disponível', 0, :new.id);
        END IF;
    END LOOP;
END;

import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosController } from './controllers/produtos.controller';
import { ProdutosService } from './services/produtos.service';
import { CreateProdutoDto } from './models/dto/create-produto.dto';
import { UpdateProdutoDto } from './models/dto/update-produto.dto';

describe('ProdutosController', () => {
  let controller: ProdutosController;
  let id: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [ProdutosService],
    }).compile();

    controller = module.get<ProdutosController>(ProdutosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it('should return an array of products', () => {
    controller.findAll("","").then((produtos) => {
      expect(produtos).toBeInstanceOf(Array);
    });
  });
  
  it('should be ordered by number of clicks', async () => {
    controller.findAll("","").then((produtos) => {
      expect(produtos[0].numeroDeCliques.valueOf())
      .toBeGreaterThan(produtos[1].numeroDeCliques.valueOf())
    });
  }, 10000);
  it('should create a product', () => {
    controller.create(new CreateProdutoDto({"nome":"teste", "preco":10, "descricao": "teste","categoria":"teste", "imagem": "teste", "quantidade" : 10})).then((produto) => {
      expect(produto).toBeDefined();
      id = produto._id
    });
  });
  it('should return a product', () => {
    controller.findOne(id).then((produto) => {
      expect(produto).toBeDefined();
    });
  });
  it('should return a product with a higher number of clicks', () => {
    controller.findOne(id).then((produto) => {
      expect(produto?.numeroDeCliques.valueOf()).toBeGreaterThan(0);
    });
  });
  it('should update a product', () => {
    controller.update(id, new UpdateProdutoDto({"nome":"teste 2", "preco":10, "descricao": "teste 2","categoria":"teste 2", "imagem": "teste 2", "quantidade" : 10})).then(
      (response) => {
        expect(response.message).toBe("Updated");
        expect(response.object).toBeDefined();
      }
    );
  });
  it('should delete a product', () => {
    controller.remove(id).then((response)=>{
      expect(response.message).toBe("Object removed successfully");
      expect(response.deleted).toBeDefined();
    })
  });
});

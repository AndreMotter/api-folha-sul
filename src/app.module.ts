import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FsuUsuarioModule } from './fsu_usuario/fsu_usuario.module';
import { FsuPropriedadeModule } from './fsu_propriedade/fsu_propriedade.module';
import { FsuTalhaoModule } from './fsu_talhao/fsu_talhao.module';
import { FsuSafraModule } from './fsu_safra/fsu_safra.module';
import { FsuAnaliseTecnicaModule } from './fsu_analise_tecnica/fsu_analise_tecnica.module';
import { FsuAnaliseTecnicaImagemModule } from './fsu_analise_tecnica_imagem/fsu_analise_tecnica_imagem.module';
import { JwtAuthMiddleware } from './middleware/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'ZOr9aDeuOCuHdlgFiKlIrrqHOKBamiQps40lKFI0dCG',
      signOptions: { expiresIn: '1h' },
    }),
    FsuUsuarioModule,
    FsuPropriedadeModule,
    FsuTalhaoModule,
    FsuSafraModule,
    FsuAnaliseTecnicaModule,
    FsuAnaliseTecnicaImagemModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes('*');
  }
}
